import { Router } from "express";
import mysql2 from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Conexión a la base de datos
const db = await mysql2.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "jwtdb2",
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token requerido" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "secret");
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// GET /api/wellcome
router.get("/wellcome", (req, res) => {
  res.json({ message: "Bienvenido a la API" });
});

// POST /api/register
router.post("/register", async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const dateAdded = new Date().toISOString().split("T")[0];
    await db.execute(
      "INSERT INTO users (id, user, password, dateAdded) VALUES (UUID_TO_BIN(?), ?, ?, ?)",
      [id, user, hashedPassword, dateAdded]
    );
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "El usuario ya existe" });
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { userInput, passwordInput } = req.body;
  if (!userInput || !passwordInput)
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE user = ?", [
      userInput,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    const validPassword = await bcrypt.compare(passwordInput, rows[0].password);
    if (!validPassword)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: rows[0].id },
      process.env.JWT_SECRET ?? "secret",
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// GET /api/profile (ruta privada)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT BIN_TO_UUID(id) as id, user, dateAdded FROM users WHERE id = UUID_TO_BIN(?)",
      [req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
});

export default router;
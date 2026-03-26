# json-web-tokens

API REST con autenticación mediante JSON Web Tokens (JWT). Incluye registro de usuarios, login y acceso a rutas privadas protegidas por token.

## Requisitos

- Node.js v18+
- MySQL

## Instalación

```bash
npm install
```

## Configuración

Crea un fichero `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
```

Crea la base de datos ejecutando el fichero `jwtdb.sql`.

## Ejecución

```bash
npm start
```

El servidor arranca en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET | `/api/wellcome` | Mensaje de bienvenida | No |
| POST | `/api/register` | Registrar nuevo usuario | No |
| POST | `/api/login` | Iniciar sesión y obtener token | No |
| GET | `/api/profile` | Acceder al perfil privado | Sí (JWT) |

## Ejemplos

**Registro:**
```
POST http://localhost:3000/api/register
Content-Type: application/json

{
    "user": "usuario1",
    "password": "abc123."
}
```

**Login:**
```
POST http://localhost:3000/api/login
Content-Type: application/json

{
    "userInput": "usuario1",
    "passwordInput": "abc123."
}
```

**Acceso a ruta privada** (incluir el token devuelto por el login en la cabecera `Authorization`):
```
GET http://localhost:3000/api/profile
Authorization: <token>
```

## Dependencias

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| jsonwebtoken | Generación y verificación de JWT |
| bcryptjs | Hash de contraseñas |
| mysql2 | Conector MySQL |
| body-parser | Parseo del body de las peticiones |
| cors | Gestión de CORS |
| dotenv | Variables de entorno |
| uuid | Generación de IDs únicos |
| nodemon | Recarga automática en desarrollo |
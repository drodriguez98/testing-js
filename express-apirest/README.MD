# express-apirest

API REST de películas construida con Node.js y Express. Soporta dos modos de almacenamiento: fichero local JSON o base de datos MySQL.

## Requisitos

- Node.js v18+
- npm

## Instalación

```bash
npm install
```

## Ejecución

**Modo local** (sin base de datos, usa `movies.json`):
```bash
node server-with-local.js
```

**Modo MySQL** (requiere base de datos configurada):
```bash
node server-with-mysql.js
```

El servidor arranca en `http://localhost:1234`.

## Configuración MySQL

Para usar el modo MySQL necesitas:

1. Tener MySQL instalado y corriendo
2. Crear la base de datos ejecutando el fichero `movies.sql`
3. Crear un fichero `.env` en la raíz del proyecto con tus credenciales:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/movies` | Obtiene todas las películas |
| GET | `/movies?genre=Action` | Filtra películas por género |
| GET | `/movies/:id` | Obtiene una película por su id |
| POST | `/movies` | Crea una nueva película |
| PATCH | `/movies/:id` | Actualiza una película existente |
| DELETE | `/movies/:id` | Elimina una película |

## Ejemplos

**Obtener todas las películas:**
```
GET http://localhost:1234/movies
```

**Filtrar por género:**
```
GET http://localhost:1234/movies?genre=Action
```

**Crear una película:**
```
POST http://localhost:1234/movies
Content-Type: application/json

{
  "title": "Inception",
  "year": 2010,
  "director": "Christopher Nolan",
  "duration": 148,
  "poster": "https://url-del-poster.jpg",
  "genre": ["Action", "Sci-Fi"],
  "rate": 8.8
}
```

**Actualizar una película:**
```
PATCH http://localhost:1234/movies/:id
Content-Type: application/json

{
  "year": 2014,
  "duration": 123
}
```

**Eliminar una película:**
```
DELETE http://localhost:1234/movies/:id
```

## Validaciones

Las peticiones POST y PATCH son validadas con **Zod**. Si algún campo no cumple con el schema definido en `schemas/movies.js`, la API rechazará la petición con un error 400.

## Dependencias

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| cors | Middleware para gestión de CORS |
| mysql2 | Conector MySQL |
| mongodb | Conector MongoDB |
| zod | Validación de esquemas |
| servor | Servidor estático para desarrollo |

## Probar la API

El fichero `api.http` incluye ejemplos de todas las peticiones listos para ejecutar con la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code.
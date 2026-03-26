# sequelize-apirest

API REST de proyectos y tareas construida con Node.js, Express y Sequelize ORM sobre PostgreSQL.

## Requisitos

- Node.js v18+
- PostgreSQL

## Instalación

```bash
npm install
```

## Configuración

Ajusta las credenciales de PostgreSQL en `src/database/database.js`:

```js
new Sequelize(
    'projectsdb', // nombre de la base de datos
    'projects',   // usuario
    'abc123.',    // contraseña
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)
```

Crea la base de datos en PostgreSQL antes de arrancar:

```sql
CREATE DATABASE projectsdb;
```

Sequelize creará las tablas automáticamente al iniciar el servidor.

## Ejecución

```bash
node src/index.js
```

O en modo desarrollo con recarga automática:

```bash
npm run dev
```

El servidor arranca en `http://localhost:4000`.

## Endpoints

### Proyectos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/projects` | Obtener todos los proyectos |
| GET | `/api/projects/:id` | Obtener un proyecto por id |
| GET | `/api/projects/:id/tasks` | Obtener las tareas de un proyecto |
| POST | `/api/projects` | Crear un nuevo proyecto |
| PUT | `/api/projects/:id` | Actualizar un proyecto |
| DELETE | `/api/projects/:id` | Eliminar un proyecto |

### Tareas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| GET | `/api/tasks/:id` | Obtener una tarea por id |
| POST | `/api/tasks` | Crear una nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |

## Ejemplos

**Crear un proyecto:**
```
POST http://localhost:4000/api/projects
Content-Type: application/json

{
    "name": "Mi proyecto",
    "priority": 1,
    "description": "Descripción del proyecto"
}
```

**Crear una tarea asociada a un proyecto:**
```
POST http://localhost:4000/api/tasks
Content-Type: application/json

{
    "name": "Mi tarea",
    "done": 0,
    "projectId": 1
}
```

## Dependencias

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| sequelize | ORM para base de datos |
| pg | Conector PostgreSQL |
| pg-hstore | Serialización de datos hstore para PostgreSQL |
| morgan | Logger de peticiones HTTP |
| nodemon | Recarga automática en desarrollo |
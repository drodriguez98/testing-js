# express-real-time-chat

Chat en tiempo real construido con Node.js, Express y Socket.IO. Los mensajes se persisten en una base de datos MySQL y se recuperan automáticamente al reconectarse.

## Requisitos

- Node.js v18+
- MySQL

## Instalación

```bash
npm install
```

## Configuración

1. Crea la base de datos ejecutando el fichero `chat.sql`
2. Crea un fichero `.env` en la raíz del proyecto:

```env
PORT=3000
```

3. Ajusta las credenciales de MySQL en `server/server.js` si son distintas a las por defecto:

```js
host: 'localhost'
user: 'chat'
password: ''
database: 'chatdb'
port: 3306
```

## Ejecución

```bash
node --watch ./server/server.js
```

El servidor arranca en `http://localhost:3000`.

## Funcionamiento

- Al abrir la página el cliente obtiene un nombre de usuario aleatorio de una API externa y lo almacena en `localStorage`
- Los mensajes enviados se guardan en MySQL y se emiten a todos los clientes conectados via Socket.IO
- Si un cliente se desconecta y vuelve a conectarse, recupera automáticamente los mensajes que se perdió gracias a `connectionStateRecovery`

## Dependencias

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| socket.io | Comunicación en tiempo real |
| mysql2 | Conector MySQL |
| morgan | Logger de peticiones HTTP |
| dotenv | Variables de entorno |
| @libsql/client | Cliente LibSQL (alternativa a MySQL) |
# express-streaming

Aplicación de streaming de vídeo en tiempo real entre un servidor emisor y clientes receptores, construida con Node.js, Express y Socket.IO.

## Requisitos

- Node.js v18+

## Instalación

```bash
npm install
```

## Ejecución

```bash
node src/index.js
```

O en modo desarrollo con recarga automática:

```bash
npm run dev
```

El servidor arranca en `http://localhost:3000`.

## Funcionamiento

El proyecto tiene dos roles:

- **Servidor emisor** (`server.html`) — captura vídeo desde la cámara y lo emite frame a frame via Socket.IO
- **Cliente receptor** (`client.html`) — recibe los frames emitidos y los muestra en pantalla en tiempo real

Al acceder a `/` se redirige automáticamente a `server.html`.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Redirige a `server.html` |
| `/server.html` | Página del emisor de vídeo |
| `/client.html` | Página del receptor de vídeo |

## Dependencias

| Paquete | Uso |
|---------|-----|
| express | Framework HTTP |
| socket.io | Transmisión de frames en tiempo real |
| nodemon | Recarga automática en desarrollo |
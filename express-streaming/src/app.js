// Importa el módulo Express
import express from 'express';

// Crea una instancia de Express
const app = express();

// Establece la ruta para elementos estáticos
app.use(express.static('src/public'));

// Importa y utiliza las rutas definidas en streaming_routes.mjs
import streamingRoutes from './routes/streaming.routes.js';
app.use(streamingRoutes);

// Crea un servidor HTTP utilizando Express
import http from 'http';
const server = http.createServer(app);

// Habilita la funcionalidad de sockets en el servidor HTTP
import { Server as SocketIOServer } from 'socket.io';
const io = new SocketIOServer(server);

// Maneja la conexión del socket
io.on('connection', (socket) => {
    // Escucha el evento 'stream' y retransmite la imagen a todos los clientes conectados
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image);
    });
});

// Exporta el servidor HTTP para ser utilizado en otros archivos
export default server;
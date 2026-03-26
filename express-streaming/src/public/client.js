// JavaScript para recibir la transmisión en directo

// Establece la conexión con el servidor utilizando Socket.IO

const socket = io(); 

socket.on('stream', (image) => {
    // Recibe la imagen del servidor y la muestra en un elemento img
    let img = document.getElementById('play');
    img.src = image;
});
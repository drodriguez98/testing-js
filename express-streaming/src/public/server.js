// JavaScript para manejar la emisión en directo
const canvas = document.querySelector('#preview');
const context = canvas.getContext('2d');
const video = document.querySelector('#video');
const socket = io(); // Establece la conexión con el servidor utilizando Socket.IO
let interval;

canvas.style.display = 'none';
canvas.width = 512;
canvas.height = 384;
context.width = canvas.width;
context.height = canvas.height;

function sendMessage(msg) {
    document.querySelector('.status').innerText = msg;
}

function loadCamera(stream) { video.srcObject = stream; }

function errorCamera() { sendMessage('No se pudo iniciar la cámara'); }

function showVideo(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream', canvas.toDataURL('image/webp'));
}

function startStream() {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, loadCamera, errorCamera);
    }

    interval = setInterval(() => {
        showVideo(video, context);
    }, 100);

    // Ocultar botón de inicio y mostrar botón de detener
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'block';
}

function stopStream() {
    clearInterval(interval); // Detener la transmisión
    socket.emit('stopStream'); // Notificar al servidor para detener la transmisión

    // Ocultar botón de detener y mostrar botón de inicio
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('startBtn').style.display = 'block';

}
// Importa la aplicación desde app.mjs
import app from './app.js';

// Configura el servidor para escuchar en el puerto 3000
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});

export default server;
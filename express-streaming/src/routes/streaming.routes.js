// Importa el módulo Router de Express
import { Router } from 'express';

// Crea una instancia de Router
const router = Router();

// Define la ruta base y redirige a server.html
router.get('/', (req, res) => {
    res.redirect('server.html');
});

// Exporta las rutas para ser utilizadas en otros archivos
export default router;
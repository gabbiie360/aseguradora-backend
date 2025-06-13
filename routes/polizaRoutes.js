// routes/polizaRoutes.js
const express = require('express');
const router = express.Router();
const polizaController = require('../controllers/polizaController');

// Rutas del CRUD para Pólizas
// api/polizas

// Crear póliza
router.post('/', polizaController.crearPoliza);

// Obtener todas las pólizas
router.get('/', polizaController.obtenerPolizas);

// Obtener una póliza por ID
router.get('/:id', polizaController.obtenerPolizaPorId);

// Actualizar una póliza por ID
router.put('/:id', polizaController.actualizarPoliza);

// Eliminar una póliza por ID
router.delete('/:id', polizaController.eliminarPoliza);

module.exports = router;
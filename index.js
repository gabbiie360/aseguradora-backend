// index.js
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar CORS
app.use(cors());

// Habilitar express.json para leer datos del body
app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Definir la ruta principal
app.use('/api/polizas', require('./routes/polizaRoutes'));

app.get('/', (req, res) => {
    res.send('API de Aseguradora Funcionando');
});

// Arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
// models/Poliza.js
const mongoose = require('mongoose');

const PolizaSchema = new mongoose.Schema({
  numeroPoliza: {
    type: String,
    required: [true, 'El número de póliza es obligatorio.'],
    unique: true,
    trim: true,
  },
  tipoSeguro: {
    type: String,
    required: [true, 'El tipo de seguro es obligatorio.'],
    enum: {
      values: ["Auto", "Vida", "Hogar", "Salud"],
      message: '{VALUE} no es un tipo de seguro válido.'
    }
  },
  titular: {
    type: String,
    required: [true, 'El nombre del titular es obligatorio.'],
    trim: true,
  },
  monto: {
    type: Number,
    required: [true, 'El monto de la póliza es obligatorio.'],
    min: [0, 'El monto no puede ser negativo.']
  },
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Poliza', PolizaSchema);
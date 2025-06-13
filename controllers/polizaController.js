// controllers/polizaController.js
const Poliza = require('../models/Poliza');

// POST - Crear una nueva póliza
exports.crearPoliza = async (req, res) => {
  try {
    // Verificar si ya existe una póliza con el mismo número
    let poliza = await Poliza.findOne({ numeroPoliza: req.body.numeroPoliza });
    if (poliza) {
      return res.status(400).json({ msg: 'Ya existe una póliza con este número.' });
    }
    
    // Crear la nueva póliza
    poliza = new Poliza(req.body);
    await poliza.save();
    res.status(201).json({ msg: 'Póliza creada exitosamente', poliza });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error en el servidor', error: error.message });
  }
};

// GET - Obtener todas las pólizas
exports.obtenerPolizas = async (req, res) => {
  try {
    const polizas = await Poliza.find();
    res.status(200).json(polizas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error en el servidor' });
  }
};

// GET - Obtener una póliza por su ID
exports.obtenerPolizaPorId = async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id);
    if (!poliza) {
      return res.status(404).json({ msg: 'Póliza no encontrada.' });
    }
    res.status(200).json(poliza);
  } catch (error) {
    console.error(error);
    // Manejo de error para IDs no válidos en formato ObjectId
    if(error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'ID de póliza no válido.' });
    }
    res.status(500).json({ msg: 'Hubo un error en el servidor' });
  }
};

// PUT - Actualizar una póliza por su ID
exports.actualizarPoliza = async (req, res) => {
  try {
    const { numeroPoliza, tipoSeguro, titular, monto } = req.body;
    let poliza = await Poliza.findById(req.params.id);

    if (!poliza) {
      return res.status(404).json({ msg: 'Póliza no encontrada.' });
    }
    
    // Actualizar campos
    poliza.numeroPoliza = numeroPoliza;
    poliza.tipoSeguro = tipoSeguro;
    poliza.titular = titular;
    poliza.monto = monto;

    poliza = await Poliza.findOneAndUpdate({ _id: req.params.id }, poliza, { new: true, runValidators: true });
    res.status(200).json({ msg: 'Póliza actualizada exitosamente', poliza });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error en el servidor', error: error.message });
  }
};

// DELETE - Eliminar una póliza por su ID
exports.eliminarPoliza = async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id);
    if (!poliza) {
      return res.status(404).json({ msg: 'Póliza no encontrada.' });
    }

    await Poliza.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Póliza eliminada exitosamente.' });
  } catch (error) {
    console.error('❌ Error al eliminar póliza:', error);
    res.status(500).json({ msg: 'Hubo un error en el servidor', error: error.message });
  }
};

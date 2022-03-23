const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema(
    {
        nombre: String,
        modalidad: String,
        categoria: String,
        direccion: String,
        localidad: String,
        municipio: String,
        zona: String,
        actividades: String,
        tipo: String,
    }, 
    {
        versionKey: false,
        collection: 'clientes'
    }
)

module.exports = mongoose.model('Cliente', ClienteSchema);

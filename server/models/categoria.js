const mongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = mongose.model('Categoria', categoriaSchema);
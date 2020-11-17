const mongoose = require('mongoose');

const FilaSchema = mongoose.Schema({
    telefone: {
        type: String,
        require: true
    },
    prioridade: {
        type: Number,
        require: true
    },
    sessao: {
        type: String,
    },
    etapa: {
        type: String,
    },
    payload: {
        type: Object
    },
    enviada: {
        type: Boolean,
        default: false
    },
});

mongoose.model('Fila', FilaSchema);
const FilaModel = mongoose.model('Fila', FilaSchema);

module.exports = FilaModel;
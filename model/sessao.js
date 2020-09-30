const mongoose = require('mongoose');

const SessaoSchema = mongoose.Schema({
    telefone: {
        type: String,
        require: true
    },
    sessao: {
        type: String,
        require: true
    },
    etapa: {
        type: String,
        require: true
    },
    finalizada: {
        type: Number,
        require: true
    },
    parametros: {
        type: Object
    },
});

mongoose.model('Sessao', SessaoSchema);
const SessaoModel = mongoose.model('Sessao', SessaoSchema);

module.exports = SessaoModel;
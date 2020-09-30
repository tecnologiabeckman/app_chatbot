const mongoose = require('mongoose');

const PesquisaSchema = mongoose.Schema({
    telefone: {
        type: String,
        require: true
    },
    pergunta: {
        type: String,
        require: true
    },
    parametros: {
        type: Object
    },
});

mongoose.model('Pesquisa', PesquisaSchema);
const PesquisaModel = mongoose.model('Pesquisa', PesquisaSchema);

module.exports = PesquisaModel;
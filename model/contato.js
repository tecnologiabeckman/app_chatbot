const mongoose = require('mongoose');

const ContatoSchema = mongoose.Schema({
    telefone: {
        type: String,
        require: true
    }
});

mongoose.model('Contato', ContatoSchema);
const ContatoModel = mongoose.model('Contato', ContatoSchema);

module.exports = ContatoModel;
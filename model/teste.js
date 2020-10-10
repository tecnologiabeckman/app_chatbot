const mongoose = require('mongoose');

const TesteSchema = mongoose.Schema({
    datas:{
        type: Object
    },
    people: [
        {
            id: Number,
            nome: String
        }
    ]
});

mongoose.model('Teste', TesteSchema);
const TesteModel = mongoose.model('Teste', TesteSchema);

module.exports = TesteModel;
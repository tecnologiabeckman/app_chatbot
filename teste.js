/** Models mongoose */
var sessaoMain = require('./model/sessao');
var teste = require('./model/teste');
require('dotenv').config();
const mongoose = require('mongoose');
//mongoose.connect('mongodb://10.51.19.55:27017/nps', {
mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

(async () =>{
/*
    const filter = { 
        sessao : 'nps',
        etapa : '07',
        finalizada : 1,
        telefone : '559294493350',
        parametros: {nota:'MOISES SANTOS'}
     };
    //const update = { etapa: '03' };
    //const update = { parametros: {nota:'MOISES SANTOS'} };
    const update = { finalizada : 0 };
    
    mongoose.set('useFindAndModify', false);

    let qtdeDoc = await sessaoMain.countDocuments(filter)
    
    console.log(`Qtde documentos: ${qtdeDoc}`); // 0
    
    let doc = await sessaoMain.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // Make this update into an upsert
    });
    
    //doc.name; // Will Riker
    //doc.age; // 29
    
    console.log(JSON.parse(JSON.stringify(doc)));
    */

   /* 
   var values = Array();
   var datas = Array();

   values.push({
       id: 1,
       nome: 'MOISES.SANTOS'
   });
   values.push({
       id: 5,
       nome: 'JENNIFER.LAUANNA'
   });
   values.push({
       id: 2,
       nome: 'JOAO.SANTOS'
   });
   values.push({
       id: 3,
       nome: 'MARIA.PINTO'
   });
   values.push({
       id: 4,
       nome: 'ANA.MARQUES'
   });

   datas.push({
       codigo:10,
       data: '15/08/1926'
   });
   datas.push({
       codigo:11,
       data: '13/02/1997'
   });
   datas.push({
       codigo:12,
       data: '01/09/1939'
   });
   datas.push({
       codigo:13,
       data: '12/05/1945'
   });
   datas.push({
       codigo:14,
       data: '12/09/1989'
   });

   await new teste({
        datas: {disponiveis: datas},
        people: values
   }).save();
   */

   let testeSessao = await teste.findOne();
   //console.log(JSON.parse(JSON.stringify(testeSessao)));
   console.log(`QUANTIDADE DE DATAS: ${testeSessao.datas.disponiveis.length}`);
   //console.log(`QUANTIDADE DE DATAS: ${ await teste.countDocuments(testeSessao.datas.disponiveis)}`);
   console.log(JSON.parse(JSON.stringify(testeSessao.datas)));
   //console.log(JSON.parse(JSON.stringify(testeSessao.datas.disponiveis[0])));

   for(let i = 0; i < testeSessao.datas.disponiveis.length; i++){
    console.log(`DATAs ${i+1}`);
    console.log(`CODIGO: ${testeSessao.datas.disponiveis[i].codigo}`);
    console.log(`DATA: ${testeSessao.datas.disponiveis[i].data}`);
   }

})();


/*
var values = Array();

values.push({
    id: 1,
    nome: 'MOISES.SANTOS'
});
values.push({
    id: 5,
    nome: 'JENNIFER.LAUANNA'
});
values.push({
    id: 2,
    nome: 'JOAO.SANTOS'
});
values.push({
    id: 3,
    nome: 'MARIA.PINTO'
});
values.push({
    id: 4,
    nome: 'ANA.MARQUES'
});

//var indice = values.findIndex(obj => obj.id == numeroARemover);
var indice = values.findIndex(obj => obj.nome == 'JOAO.SANTOS');
values.splice(indice, 1);

values.forEach(element => {
    console.log(element); 
});

console.log(`POSIÇÃO: ${indice}`);
*/
//var arrayConfirmaConsulta = values.filter(function(obj) { return obj.id == 5; });
//console.log(`ENCONTRADO: ${JSON.stringify(arrayConfirmaConsulta)}`);

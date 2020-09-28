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

//var arrayConfirmaConsulta = values.filter(function(obj) { return obj.id == 5; });
//console.log(`ENCONTRADO: ${JSON.stringify(arrayConfirmaConsulta)}`);

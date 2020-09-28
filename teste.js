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

console.log(JSON.stringify(values));

var arrayConfirmaConsulta = values.filter(function(obj) { return obj.id == 5; });
var pos = values.indexOf(arrayConfirmaConsulta[0].nome);

values.forEach(element => {
   console.log(element); 
   //console.log(element.nome); 
   //var pos = values.indexOf(element.nome);
   //console.log(`Posição: ${pos}`);
});

console.log(`POSIÇÃO: ${pos}`);
//console.log(`ENCONTRADO: ${JSON.stringify(arrayConfirmaConsulta)}`);
console.log(`ENCONTRADO: ${arrayConfirmaConsulta[0].nome}`);
// Média de Notas da 3ª Pergunta
db.pesquisas.aggregate([
    {
        $match : { pergunta: '3 - De 0 a 10 quanto você daria para nosso atendimento? 🧐' } 
    },
    {
        $group : {
           _id : '$telefone',
          // totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           mediaNota: { $avg: "$parametros.respota" },
           count: { $sum: 1 }
        }
    }
]);

// Média de Avaliação
db.pesquisas.aggregate([
    {
        $match : { pergunta: '3 - De 0 a 10 quanto você daria para nosso atendimento? 🧐' } 
    },
    {
        $group : {
           _id : '$pergunta',
           mediaNota: { $avg: "$parametros.respota" }
        }
    }
]);

// Agregação da 2ª pergunta
db.pesquisas.aggregate([
    {
        $match : { pergunta: '2 - Você voltaria a nossa loja?\n*sim* ou *não*'} 
    },
    {
        $group : {
           _id : '$parametros.respota',
           count: { $sum: 1 }
        }
    }
]);


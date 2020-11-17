const util = require('./utils/util');
const processaFila = require('./controller/processa_fila.controller');

/** Rest do AXIOS **/
const api = require('./rest/restApi'); // Chama o DAO-API
const paramentrosAxios = {
    'raizRestaurant': 'restaurant'
};

var sessaoMain = require('./model/sessao');
let contato = require('./model/contato');

async function interacaoRestaurante(client, message, sessao){

    if(sessao.etapa == '01'){
        if(util.verificarEscolha(message.body) !=  'inválido' && message.hasMedia==false && message.type != 'call_log')
        {
            // respondeu SIM
            if(util.verificarEscolha(msg.body) == 'sim'){
                /** Listará os pratos e Bebidas */
                
                //let listPratos = await api.restApi('all', `${paramentrosAxios.raizRestaurant}/pratos`,{}); // pratos
                /*if(listPratos.data != undefined){
                    asyncForEach(listPratos.data, async (prato) => {
                    });
                }*/

            }else
            if(utils.verificarEscolha(msg.body) == 'não'){ // respondeu NÃO

            }
        }else{
            message.reply('*Desculpe, a opção que você informou é inválida, tente novamente informando SIM ou NÃO*');
            client.sendMessage(message.from, `Deseja ver o nosso cardápio de Hoje?\nDigite somente: *SIM* ou *NÃO*`);
        }
    }else 
    if(sessao.etapa == '02'){

    }
}

module.exports.interacaoRestaurante = interacaoRestaurante;
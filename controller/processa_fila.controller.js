var filaMain = require('../model/fila');
const utils = require('../utils/util');
require('dotenv').config();

/**
 * 
 * @param {*} client instância do WhatsApp para envio das mensagens
 * 
 */

const processaFila = async (client,sessao) => {
    let f = await filaMain.find({
        enviada: false,
        sessao: sessao
    }).sort([['prioridade', 1]]);

    if( f != null ){ // Verifica se a FILA não está vazia
        asyncForEach(f, async (element) => {
            await element.updateOne({
                enviada: true
            });
            client.sendMessage(utils.formataTelefone(element.telefone,'whatsapp'), element.payload.msg);            
            console.log(`ENVIADO NA FILA, TEMPO: ${Date()}`);
            // 1 mensagem a cada 1 segundo
            await wait(2000);
        });
    }
}

/**
 * @param {{
    telefone: string,
    prioridade: number,
    sessao: string,
    etapa: string,
    payload: object,
    enviada: boolean 
 }} f função para inserir dados na fila de envio
 */
const insereFila = async (f) => {
    let fi = await filaMain.create(f);
    return fi;
}

// Função auxiliar para controle de mensagens por segundo
async function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

module.exports.processaFila = processaFila;
module.exports.insereFila = insereFila;
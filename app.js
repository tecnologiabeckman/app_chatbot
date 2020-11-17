const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const util = require('./utils/util');
const getSaudacao = require('./utils/util').getSaudacao;
const controllerPesquisa = require('./controller/pesquisaController');
const processaFila = require('./controller/processa_fila.controller');

/** Rest do AXIOS **/
const api = require('./rest/restApi'); // Chama o DAO-API
const paramentrosAxios = {
    'raizRestaurant': 'restaurant'
};

var sessaoMain = require('./model/sessao');
let contato = require('./model/contato');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('Client is ready!');
    await rotinaPesquisa();
    await rotinaRestaurante();
});

client.initialize();

client.on('message', async message => {

    let sessao = await sessaoMain.findOne({
        telefone: util.formataTelefone(message.from,'mongo'),
        finalizada: 0
    });

    if(sessao){ //possui sessão
        switch(sessao.sessao){
            case 'beckman':
                    await controllerPesquisa.iniciarPesquisa(client, message, sessao);
                break;
        }
    }
/*
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
    }
    */
});

async function rotinaPesquisa()
{
    let contatos = await contato.find({});
    if(contatos){
        asyncForEach(contatos, async (rp) => {
            let sessao = await sessaoMain.findOne({
                telefone: rp.telefone,
                sessao: 'beckman',
                etapa: '01',
                finalizada: 0
            });

            if(!sessao){

                let msn = `Olá Cliente ☺\n\n Bem-vindo a nossa pesquisa\n1 - Qual seu nome completo?`;

                client.sendMessage(util.formataTelefone(rp.telefone, 'whatsapp'), `Oi esse é um Chatbot teste de uma loja criado por Moisés 😀😀 para pesquisa de satisfação`);
                client.sendMessage(util.formataTelefone(rp.telefone, 'whatsapp'), `${msn}`);  // 1ª PERGUNTA DA PESQUISA

                await new sessaoMain(
                    {
                        telefone: util.formataTelefone(rp.telefone, 'mongo'),
                        sessao: 'beckman',
                        etapa: '01',
                        finalizada: 0
                    }
                )
                .save()
                .then(() => {
                    console.log(`SALVOU`);
                    return {
                        status: 'ok',
                        msg: 'Cadastrado com sucesso..'
                    }
                }).catch(() => {
                    console.log(`NÃO SALVOU`);
                    return {
                        status: 'falha',
                        msg: 'Erro ao cadastrar sessao..'
                    }
                });
            }
        });
    }else{
        console.log(`NÃO TEM CONTATOS CADASTRADOS`);
    }

}

async function rotinaRestaurante(){
    /*
    let findCliente = await api.restApi('find', `${paramentrosAxios.raizRestaurant}/clientById`,{'id':112});
    if (findCliente.data != undefined) {
        //console.log(JSON.stringify(findCliente.data));
        asyncForEach(findCliente.data, async (rp) => {
            console.log(JSON.stringify(rp));
        });
    }
    */

    let listClientes = await api.restApi('all', `${paramentrosAxios.raizRestaurant}/clients`,{}); // clientes
    if(listClientes.data != undefined){
        asyncForEach(listClientes.data, async (cliente) => { 
            var dados = {
                'telefone': util.formataTelefone(cliente.telefone, 'mongo'),
                'sessao': 'vendarestaurante'
               // 'identificador': `<>`
            };                                       
            dados.finalizada = 0;
            dados.etapa = '01';
            // TRUE: número cadastrado no WhatsApp, FALSE: não cadastrado
            let numeroCadastroWhatsApp = await verificarCadastroContatoWhatsApp(util.formataTelefone(cliente.telefone, 'whatsapp'));
            let fila = {
                telefone: util.formataTelefone(cliente.telefone, 'mongo'),
                prioridade: 1,
                sessao: dados.sessao,
                etapa: dados.etapa,
                payload: { msg: `${getSaudacao()} ${cliente.nome}\n\nDeseja ver o nosso cardápio de Hoje?\nDigite somente: *SIM* ou *NÃO*` },
                enviada: false
            };

            // Condição que verifica se o Número não existir no WhatsApp
            if (numeroCadastroWhatsApp == false) {
                fila.enviada = true;
                dados.finalizada = 1;
                dados.parametros = {ocorrido = `NUMERO NAO CADASTRADO`};
            }

            await new sessaoMain(dados).save(); // salva na sessão
            await processaFila.insereFila(fila); // Insere na Fila                  
                
        });
    }
}

/**
 * Função responsável por verificar se o contato está cadastrado no WhatsApp ou não
 * retorna TRUE -> CADASTRADO, FALSE -> NÃO CADASTRADO
 * @param {CONTATO} contato 
 */
async function verificarCadastroContatoWhatsApp(contato) {
    const isOnWhatsApp = await client.isRegisteredUser(contato);
    //const isOnWhatsApp = await client.isRegisteredUser('559285079545@c.us');
    return isOnWhatsApp;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
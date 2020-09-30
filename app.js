const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const util = require('./utils/util');
const controllerPesquisa = require('./controller/pesquisaController');

var sessaoMain = require('./model/sessao');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var contatos = Array();

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

client.on('ready', () => {
    console.log('Client is ready!');
    await rotinaPesquisa();
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
    contatos.push({
        id: 1,
        telefone: '559294493350'
    });
/*
    contatos.push({
        id: 1,
        telefone: '559294493350'
    },
    {
        id: 1,
        telefone: '559294493350'
    });
*/
    
    asyncForEach(contatos, async (rp) => {
        let sessao = await sessaoMain.findOne({
            sessao: 'beckman',
            etapa: '01',
            finalizada: 0
        });

        if(!sessao){

            let msn = `Olá Cliente\n\n Bem-vindo a nossa pesquisa\n1 - Qual seu nome completo?`;

            client.sendMessage(util.formataTelefone(rp.telefone, 'whatsapp'), `${msn}`);  // 1ª PERGUNTA DA PESQUISA

            await new sessaoMain()
            .save({
                telefone: util.formataTelefone(rp.telefone, 'mongo'),
                sessao: 'beckman',
                etapa: '01',
                finalizada: 0
            })
            .then(() => {
                return {
                    status: 'ok',
                    msg: 'Cadastrado com sucesso..'
                }
            }).catch(() => {
                return {
                    status: 'falha',
                    msg: 'Erro ao cadastrar sessao..'
                }
            });
        }
    });
   

}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
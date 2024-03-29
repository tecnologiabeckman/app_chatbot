/** Models mongoose */
var pesquisaCollection = require('../model/pesquisa');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const util = require('../utils/util');

let perguntas = [
                    `1 - Qual seu nome completo?`,
                    `2 - Você voltaria a nossa loja?\n*sim* ou *não*`,
                    `3 - De 0 a 10 quanto você daria para nosso atendimento? 🧐`,
                    `4 - Qual sugestão de melhoria você daria para nós?`,
                    `Agradecemos sua participação nessa pesquisa !!! 👍😁`
                ];

async function iniciarPesquisa(client, message, sessao){
     
    // Verifico as etapas
    if (sessao.etapa == '01') { // Primeira pergunta
        // Insere pesquisa
        await new pesquisaCollection({
                            telefone: sessao.telefone,
                            pergunta: perguntas[0],
                            parametros: {respota: message.body}
                        })
                    .save()
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
        client.sendMessage(message.from, perguntas[1]);
        // Atualiza sessão
        await sessao.updateOne({
            etapa: '02',
            parametros: {nota:message.body}
        });
        
    }else
    if (sessao.etapa == '02') { // Segunda Pergunta
        if(util.verificarEscolha(message.body) !=  'inválido')
        {
            // Insere pesquisa
            await new pesquisaCollection({
                                telefone: sessao.telefone,
                                pergunta: perguntas[1],
                                parametros: {respota: util.verificarEscolha(message.body)}
                            })
                        .save()
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
            client.sendMessage(message.from, perguntas[2]);
            // Atualiza sessão
            await sessao.updateOne({
                etapa: '03',
                parametros: {nota:message.body}
            });

        }else{
            message.reply('*Desculpe, a opção que você informou é inválida, tente novamente informando SIM ou NÃO*');
            client.sendMessage(message.from, perguntas[1]);
        }
    }else
    if (sessao.etapa == '03') { // Terceira Pergunta
        if(util.verificaNota(message.body) !=  'inválido')
        {
            if(util.verificaNota(message.body) >= 0 && util.verificaNota(message.body) < 11)
            {
                // Insere pesquisa
                await new pesquisaCollection({
                                    telefone: sessao.telefone,
                                    pergunta: perguntas[2],
                                    parametros: {respota: util.verificaNota(message.body)}
                                })
                                .save()
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
                client.sendMessage(message.from, perguntas[3]);
                // Atualiza sessão
                await sessao.updateOne({
                    etapa: '04',
                    parametros: {nota:message.body}
                });
            }else{
                message.reply('*Desculpe, a opção que você informou é inválida, tente novamente informando 0 a 10*');
                client.sendMessage(message.from, perguntas[2]);
            }
        }else{
            message.reply('*Desculpe, a opção que você informou é inválida, tente novamente informando 0 a 10*');
            client.sendMessage(message.from, perguntas[2]);
        }
    }else
    if(sessao.etapa == '04')
    {
        // Insere pesquisa
        await new pesquisaCollection({
            telefone: sessao.telefone,
            pergunta: perguntas[3],
            parametros: {respota: message.body}
        })
        .save()
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
        client.sendMessage(message.from, perguntas[4]);
        // Atualiza sessão
        await sessao.updateOne({
            etapa: '05',
            finalizada: 1,
            parametros: {nota:message.body}
        });
    }

}

module.exports.iniciarPesquisa = iniciarPesquisa;
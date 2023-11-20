import { obterCardsCategorias } from "../DialogFlow/funcoes.js";
import Chamados from "../Modelo/Chamado.js";

export default class ChamadoCTRL {

    processarIntents(req, resp) {
        //processar intenções vindas do dialog flow ao consumir o serviço de webhook
        const payload = req.body;
        const intencao = payload['queryResult']['intent']
        const chamado = [{
            'sessao': '',
            'categoria': '',
            'prioridade': '',
            'matricula': '',
            'usuario': '',
            'numeroChamado': ''
        }];

        if (intencao) {
            if (intencao['displayName'] === 'MenuAtendimento - yes') { 
                const source = payload['originalDetectIntentRequest']['source']

                let resposta = { fulfillmentMessages: [] };
                let categoriasCards = [];

                if (source) {
                    categoriasCards = obterCardsCategorias('custom').then((categoriasCards) => {
                        for (const card of categoriasCards) {
                            resposta['fulfillmentMessages'].push(card);
                        }
                        resposta['fulfillmentMessages'].push({
                            'text': {
                                'text': [
                                    'Deseja abrir um chamado.'
                                ]
                            }
                        });
                        return resp.json(resposta);
                    });
                }
                else {
                    categoriasCards = obterCardsCategorias('messenger').then((categoriasCards) => {
                        resposta['fulfillmentMessages'].push({
                            "payload": {
                                "richContent": []
                            }
                        })
                        resposta['fulfillmentMessages']['0']['payload']['richContent'].push(categoriasCards);
                        resposta['fulfillmentMessages'].push({
                            'text': {
                                'text': [
                                    'Abra seu chamado.'
                                ]
                            }
                        });
                        return resp.json(resposta);
                    });
                }
            }
            //else if guarda no backend as informações do pedido
            // else if (intencao['displayName'] === 'pedido') {
            //     if (payload['queryResult']['action'] === 'PedidoParametros'){ 
            else if (intencao['displayName'] === 'CriarChamado') {
                let resposta = { 'fulfillmentMessages': [] };

                chamado.sessao = payload['queryResult']['outputContexts'][0]['name'].split('sessions')[1].split('/')[1];
                chamado.categoria = payload['queryResult']['parameters']['categoria'];
                chamado.prioridade = payload['queryResult']['parameters']['prioridade'];
                chamado.usuario = payload['queryResult']['parameters']['usuario'];
                chamado.matricula = payload['queryResult']['parameters']['matricula'];

                let msgChamado = 'Estamos abrindo seu chamado com a prioridade ' + chamado.prioridade + '. ';
                // for (let i = 0; i < chamado.categoria.length; i++) {
                //     msgChamado += chamado.prioridade[i] + ' ' + chamado.categoria[i] + '\n';
                // } para listas

                resposta['fulfillmentMessages'].push({
                    'text': {
                        'text': [
                            msgChamado += ' Você confirma a abertura do chamado?'
                        ]
                    }
                });

                return resp.json(resposta);
            }
            else if (intencao['displayName'] === 'CriarChamado - yes') { 
                chamado.sessao = payload['queryResult']['outputContexts'][0]['name'].split('sessions')[1].split('/')[1];
                chamado.categoria = payload['queryResult']['outputContexts'][0]['parameters']['categoria'];
                chamado.prioridade = payload['queryResult']['outputContexts'][0]['parameters']['prioridade'];
                chamado.usuario = payload['queryResult']['outputContexts'][0]['parameters']['usuario']['name'];
                chamado.matricula = payload['queryResult']['outputContexts'][0]['parameters']['matricula'];
                chamado.numeroChamado = Math.floor(Math.random() * 10000);

                let resposta = { 'fulfillmentMessages': [] };

                resposta['fulfillmentMessages'].push({
                    "text": {
                        "text": [
                            "Chamado Nº " + chamado.numeroChamado + " com a categoria " + chamado.categoria + " e prioridade " + chamado.prioridade + ". Aberto pelo usuário " + chamado.usuario + " com matrícula " + chamado.matricula + "! Atendimento a ser realizado pelo técnico Alexandre." 
                        ]
                    }
                });

                const _chamados = new Chamados(
                    0,
                    chamado.sessao,
                    chamado.categoria,
                    chamado.prioridade,
                    chamado.usuario,
                    chamado.matricula,
                    chamado.numeroChamado
                );

                _chamados.gravar().then(() => {
                    resp.json(resposta);
                }).catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
        }
    }
}
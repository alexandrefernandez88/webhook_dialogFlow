import conectar from "./Conexao.js";
import Chamados from "../Modelo/Chamado.js";


export default class ChamadoDAO{

    //colocar método assincrono aguardando a inclusão do chamado no BD
    async incluir(chamado){
        if (chamado instanceof Chamados){
            // for (let i = 0; i < chamado.categoria.length; i++){ para listas
                const conexao = await conectar();
                const sql = 'INSERT INTO chamados (sessao, categoria, prioridade, matricula, usuario, numeroChamado) VALUES (?, ?, ?, ?, ?, ?)';
                const valores = [   chamado.sessao,
                                    chamado.categoria,
                                    chamado.prioridade,
                                    chamado.matricula,
                                    chamado.usuario,
                                    chamado.numeroChamado];
                await conexao.query(sql, valores);
            }
        }
    }
//}
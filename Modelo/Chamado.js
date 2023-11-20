import ChamadoDAO from "../Persistencia/ChamadoDAO.js";

export default class Chamados{
    #idChamado
    #sessao
    #categoria
    #prioridade
    #matricula
    #usuario
    #numeroChamado
    
    constructor(idChamado, sessao, categoria, prioridade, matricula, usuario, numeroChamado){
        this.#idChamado = idChamado;
        this.#sessao = sessao;
        this.#categoria = categoria;
        this.#prioridade = prioridade;
        this.#matricula = matricula;
        this.#usuario = usuario;
        this.#numeroChamado = numeroChamado;
    }

    //idChamado
    get idChamado(){
        return this.#idChamado;
    }
    set idChamado(novoIdChamado){
        this.#idChamado = novoIdChamado;
    }


    //sessao
    get sessao(){
        return this.#sessao;
    }
    set sessao(novoSessao){
        this.#sessao = novoSessao;
    }


    //categoria
    get categoria(){
        return this.#categoria;
    }
    set categoria(novoCategoria){
        this.#categoria = novoCategoria;
    }


    //prioridade
    get prioridade(){
        return this.#prioridade;
    }
    set prioridade(novoPrioridade){
        this.#prioridade = novoPrioridade;
    }



    //matricula
    get matricula(){
        return this.#matricula;
    }
    set matricula(novoMatricula){
        this.#matricula = novoMatricula;
    }


    //usuario
    get usuario(){
        return this.#usuario;
    }
    set usuario(novoUsuario){
        this.#usuario = novoUsuario;
    }


    //numeroChamado
    get numeroChamado(){
        return this.#numeroChamado;
    }
    set numeroChamado(novoNumeroChamado){
        this.#numeroChamado = novoNumeroChamado;
    }

    toJSON(){
        return{
            'idChamado' : this.#idChamado,
            'sessao' : this.#sessao,
            'categoria' : this.#categoria,
            'prioridade' : this.#prioridade,
            'matricula' : this.#matricula,
            'usuario' : this.#usuario,
            'numeroChamado' : this.#numeroChamado
        }
    }

    async gravar(){
        const chamado = new ChamadoDAO();
        await chamado.incluir(this);
    }

}
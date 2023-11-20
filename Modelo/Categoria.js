import CategoriaDAO from "../Persistencia/CategoriaDAO.js";

export default class Categoria {
    #id
    #categoria
    #prazo
    #urlImagem

    constructor(id = 0, categoria = "", prazo = "", urlImagem = "") {
        this.#id = id;
        this.#categoria = categoria;
        this.#prazo = prazo;
        this.#urlImagem = urlImagem;
    }


    //id
    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }


    //categoria
    get categoria() {
        return this.#categoria;
    }
    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }


    //prazo
    get prazo() {
        return this.#prazo;
    }
    set prazo(novoPrazo) {
        this.#prazo = novoPrazo;
    }


    //urlImagem
    get urlImagem() {
        return this.#urlImagem;
    }
    set urlImagem(novaURL) {
        this.#urlImagem = novaURL;
    }


    //json
    toJSON() {
        return {
            id: this.#id,
            categoria: this.#categoria,
            prazo: this.#prazo,
            urlImagem: this.#urlImagem
        }
    }

    async consultar() {
        const categoriaDAO = new CategoriaDAO();
        const categorias = await categoriaDAO.consultar();
        return categorias;
    }
}
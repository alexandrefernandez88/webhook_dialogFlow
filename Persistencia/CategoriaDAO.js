import Categoria from "../Modelo/Categoria.js";
import conectar from "./Conexao.js";

export default class CategoriaDAO {

    // incluir() {
    //     //teste
    // }

    // alterar() {
    //     //teste
    // }

    // excluir() {
    //     //teste
    // }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM catservice";
        const [rows] = await conexao.query(sql);
        const listaCategoria = [];

        for (const row of rows) {
            const categoria = new Categoria(row['id'], row['categoria'], row['prazo'], row['urlImagem']);
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }
}
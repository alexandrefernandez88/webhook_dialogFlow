import Categoria from "../Modelo/Categoria.js";

//retorna objeto no formato card para o DialogFlowMessenger
export function criarMessengerCard(){
    return{
        type: "info",
        title: "",
        subtitle: "",
        image: {
            src:{
                "rawUrl": ""
            }
        },
        "actionLink":""
    }
}

export function criarCustomCard(){
    return{
      "card": {
                    title: "",
                    subtitle: "",
                    imageUri: "https://example.com/images/example.png",
                    buttons: [
                                    {
                                        "text" : "button text",
                                        "postback": "https://example.com/path/for/end-user/to/follow"
                                    }
                             ]
               }
    }
}

export async function obterCardsCategorias(tipo="custom"){
    const categoria = new Categoria();
    let listaCards = [];
    const categorias = await categoria.consultar();

    for(const categoria of categorias){
        let card;

        if(tipo === "custom"){
            card = criarCustomCard(); 
            card["card"]["title"] = categoria.categoria;
            card["card"]["subtitle"] = "PRAZO: " + categoria.prazo+".";
            card["card"]["imageUri"] = categoria.urlImagem;
            card["card"]["buttons"]["postback"] = "https://siteAtendimento/" + categoria.categoria+".html";
        }else if(tipo === "messenger"){
            card = criarMessengerCard();
            card["title"] = categoria.categoria;
            card["subtitle"] = "PRAZO: " + categoria.prazo+".";
            card["image"]["src"]["rawUrl"] = categoria.urlImagem;
            card["actionLink"] = "https://siteAtendimento/" + categoria.categoria+".html";
        }  

      listaCards.push(card);
    }

    return listaCards;
}
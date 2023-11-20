import express  from "express";
import rotaDlgFlow from "./Rotas/rotaDlgFlow.js";
import cors from "cors";

const host = '0.0.0.0'; //qualquer interface
// const porta = 5001;
const porta = 5002;
// const porta = 3306;
// const porta = 8080;
const app = express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:true}));


app.use(express.json());
app.use('/webhook', rotaDlgFlow);
app.use(express.static("./html"));

// app.listen(porta, host, ()=>{
app.listen(porta, host, ()=>{
    console.log("WebHook escutando na porta " + porta);
});
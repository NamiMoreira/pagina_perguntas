const express = require("express");
const app = express();
const bodyParser =  require("body-parser")
const host = 'localhost';
const port = 4040;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
const { where } = require("sequelize");

connection
.authenticate()
.then(() =>{
    console.log('Sucesso')
})
.catch((msgErro) =>{
        console.log(msgErro);
});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend: false}));


app.get("/perguntar", (req, res) => {
    res.render("perguntar");

})

app.get("/", (req, res) => {
    Pergunta.findAll({raw:true,order:[['id','DESC']]
    })
    .then((perguntas)=>{
        res.render("index",{
            perguntas: perguntas
        });
    })

})

app.post("/salvarPergunta", (req,res)=> {
    var titulo = req.body.titulo;
    var pergunta = req.body.pergunta;
    Pergunta.create({
        titulo: titulo,
        descricao: pergunta
    }).then(() => {
        res.redirect('/');
    })
})
 app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if (pergunta != undefined ) {
            Resposta.findAll(
                {where: {pergunta_Id: id},
                 raw:true,
                 order:[['id','DESC']]
    }).then(resposta =>{
        res.render("pergunta",{
            pergunta: pergunta,
            resposta: resposta
    })
            })
            }else{
                res.redirect("/")
            }
        })
   
 })
  
 app.post("/responder",(req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        pergunta_Id: perguntaId
    })
    res.redirect('/pergunta/'+ perguntaId)
 })


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  
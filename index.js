const express = require("express");
const app = express();
const bodyParser =  require("body-parser")
const host = 'localhost';
const port = 4040;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend: false}));


app.get("/perguntar", (req, res) => {
    res.render("perguntar");

})

app.get("/", (req, res) => {
    res.render("index");

})

app.post("/salvarPergunta", (req,res)=> {
    var titulo = req.body.titulo;
    var pergunta = req.body.pergunta;
    res.send("formulario recebido " + titulo + pergunta)
})




app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  //teste de commit github
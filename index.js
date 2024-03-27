const express = require("express");
const app = express();
const host = '192.168.30.26';
const port = 4040;

app.set('view engine','ejs')
app.use(express.static('public'));


app.get("/perguntar", (req, res) => {
    res.render("perguntar");

})

app.get("/", (req, res) => {
    res.render("index");

})




app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
const Sequelize = require('sequelize');
const connection = require("./database");

const Resposta = connection.define("resposta",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    pergunta_Id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({forcec: false});

module.exports = Resposta;
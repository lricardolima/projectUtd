const env = require('./env.js')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    logging: false, // Desabilita o logging do Sequelize para evitar mensagens desnecessárias no console
})

const db = {
    sequelize, // Unifica a definição de sequelize
    Sequelize, // Unifica a definição de Sequelize
}

// Importa o modelo de cliente e define a relação com o Sequelize
db.Client = require('../models/client.model.js')(sequelize, Sequelize)

module.exports = db

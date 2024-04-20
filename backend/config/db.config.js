const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

// Verifica se todas as variáveis de ambiente necessárias estão definidas
const requiredEnvVariables = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
const missingEnvVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

if (missingEnvVariables.length > 0) {
    throw new Error(`Variáveis de ambiente ausentes: ${missingEnvVariables.join(', ')}`);
}

// Cria uma instância do Sequelize
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Especifica explicitamente o dialeto do banco de dados
    logging: process.env.NODE_ENV !== 'production' ? console.log : false // Desabilita o logging do Sequelize em produção
});

// Define os modelos e suas relações com o Sequelize
const CartCheckModel = require('../app/cartCheck/models/cartCheck.model.js');


const db = {
    sequelize, // Unifica a definição de sequelize
    Sequelize, // Unifica a definição de Sequelize
    CartCheck: CartCheckModel(sequelize)
};

module.exports = db;

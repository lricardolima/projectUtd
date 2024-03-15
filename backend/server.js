const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const db = require('./app/config/db.config')
const Client = db.Client
const router = require('./app/routes/routes')

// Reconfigures CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// Configuração do body parser para processar JSON
app.use(bodyParser.json())

// Configuração de arquivos estáticos
app.use(express.static('resource'))

// Configuração das rotas
app.use('/', router)

// Inicialização do servidor
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at https://%s:%s', host, port)
})

// Sincronização do modelo e criação de dados iniciais
db.sequelize.sync({ force: true }).then(() => {
    console.log('Delete and recreate the table using { force: true }')
    Client.sync().then(() => {
        const clients = [
            { name: 'Luis Ricardo', age: 38, email: 'luislima@email.com' },
            { name: 'Ruth Rodrigues', age: 35, email: 'ruthrod@email.com' },
            { name: 'Lizandra Sampaio', age: 15, email: 'lizandra@email.com' }
        ]
        clients.forEach(client => {
            Client.create(client).then(() => {
                console.log('Client created:', client.name)
            }).catch(err => {
                console.error('Error creating client:', err)
            })
        })
    })
})

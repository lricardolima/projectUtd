const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const db = require('./config/db.config')
const CartCheck = db.CartCheck
const cartCheckRouter = require('./app/cartCheck/routes/cartCheck.routes')

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
app.use('/', cartCheckRouter)

// Inicialização do servidor
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at https://%s:%s', host, port)
})

// Sincronização do modelo e criação de dados iniciais
db.sequelize.sync({ force: true }).then(async () => {
    console.log('Delete and recreate the table using { force: true }')
    try {
        await CartCheck.bulkCreate([
            {
                name: 'Meluiz',
                establishment: 'ENEL',
                card: 'Mastercard',
                purchaseDate: new Date(),
                installmentNumber: '1',
                installmentQuantity: '10',
                installmentValue: '100',
                amountDue: '1000',
                totalDue: '1000',
                lastInstallmentDate: new Date(),
            },
            {
                name: 'Caixa',
                establishment: 'CAGECE',
                card: 'Visa',
                purchaseDate: new Date(),
                installmentNumber: '1',
                installmentQuantity: '10',
                installmentValue: '100',
                amountDue: '1000',
                totalDue: '1000',
                lastInstallmentDate: new Date(),
            }
        ]);

    } catch (err) {
        console.error('Error creating records:', err);
    }
})

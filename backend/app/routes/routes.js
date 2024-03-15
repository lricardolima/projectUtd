const express = require('express')
const router = express.Router()
const clients = require('../controllers/controller.js')

// Rotas para manipulação de clientes
router.post('/api/client', clients.createClient)
router.get('/api/client/:id', clients.getClient)
router.get('/api/clients', clients.getClients)
router.put('/api/client/:id', clients.updateClient)
router.delete('/api/client/:id', clients.deleteClient)

module.exports = router

const db = require('../config/db.config')
const Client = db.Client

exports.createClient = async (req, res) => {
    try {
        const { name, age, email } = req.body
        const newClient = await Client.create({ name, age, email })
        res.status(201).json(newClient)
    } catch (err) {
        res.status(500).json({ message: 'Failed to create', error: err.message })
    }
}

exports.getClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id, { attributes: ['id', 'name', 'age', 'email'] })
        if (!client) {
            return res.status(404).json({ message: 'Client not found' })
        }
        res.status(200).json(client)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to get client', error: err.message })
    }
}

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({ attributes: ['id', 'name', 'age', 'email'] })
        res.status(200).json(clients)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to get clients', error: err.message })
    }
}

exports.deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id
        const client = await Client.findByPk(clientId)
        if (!client) {
            return res.status(404).json({ message: `Client with id ${clientId} not found` })
        }
        await client.destroy()
        res.status(200).json({ message: `Client with id ${clientId} deleted` })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Error deleting client with id ${req.params.id}`, error: err.message })
    }
}

exports.updateClient = async (req, res) => {
    try {
        const { id, name, age, email } = req.body
        let client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({ message: `Client with id ${id} not found` })
        }
        client = await client.update({ name, age, email }, { returning: true })
        res.status(200).json(client)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Error updating client with id ${req.params.id}`, error: err.message })
    }
}

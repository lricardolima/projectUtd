const express = require('express')
const router = express.Router()
const cartCheckController = require('../controllers/cartCheck.controller.js')

// Rotas para manipulação de cart-checkes
router.post('/api/cart-check', cartCheckController.createCartCheck)
router.get('/api/cart-check/:id', cartCheckController.getCartCheckById)
router.get('/api/cart-checks', cartCheckController.getAllCartChecks)
router.put('/api/cart-check/:id', cartCheckController.updateCartCheckById)
router.delete('/api/cart-check/:id', cartCheckController.deleteCartCheckById)

module.exports = router

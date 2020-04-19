const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/Orders')

router.get('/', OrderController.getAllOrder)
router.post('/', OrderController.addOrder)
router.get('/:id', OrderController.getOrderById)
router.put('/:id', OrderController.updateOrder)
router.delete('/:id', OrderController.deleteOrder)
    
module.exports = router
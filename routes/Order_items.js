const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/Order_items')

router.get('/:id', OrderController.getOrderDetailById)

module.exports = router
const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/Customers')

router.get('/', CustomerController.getAllCustomer)
router.post('/', CustomerController.addCustomer)
router.get('/:id', CustomerController.getCustomerById)
router.put('/:id', CustomerController.updateCustomer)
router.delete('/:id', CustomerController.deleteCustomer)

module.exports = router
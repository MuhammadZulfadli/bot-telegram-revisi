const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/Products')

router.get('/', ProductController.getAllProduct)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)
module.exports = router
const express = require('express')
const router = express.Router()
const DriverController = require('../controllers/Drivers')

router.get('/', DriverController.getAllDriver)
router.post('/', DriverController.addDriver)
router.get('/:id', DriverController.getDriverById)
router.put('/:id', DriverController.updateDriver)
router.delete('/:id', DriverController.deleteDriver)



module.exports = router
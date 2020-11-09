const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/properties')

router.get('/', propertyController.getProperties)
router.get('/:id/bookings', propertyController.getBookings)

module.exports = router
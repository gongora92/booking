const express = require('express')
const router = express.Router()
const { validateBody, schemas } = require('../helpers/validator')
const bookingController = require('../controllers/bookings')

router.post('/', validateBody(schemas.bookingSchema), bookingController.newBooking)

module.exports = router
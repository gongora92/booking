const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: false
  }],
  propertyId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property

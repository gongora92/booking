const mongoose = require('mongoose')
const moment = require('moment')

const bookingSchema = mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  propertyId: {
    type: 'String',
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  }
})

bookingSchema.pre('save', function (next) {
  if (!this.createdAt) this.createdAt = moment().format()
  next()
});

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking

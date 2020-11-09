const expect = require('expect')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Booking = require('../models/booking')
const { assert } = require('@hapi/joi')
// id = mongoose.Types.ObjectId();

describe('/api/bookings', () => {
  it('It should return an array withnear locations', done => {
    const body = {
      propertyId: '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f',
      startDate: '12-11-2020',
      endDate: '12-12-2020',
      guestName: 'Testing Test',
      contactNumber: '4492042567'
    }
    request(app)
      .post('/api/bookings')
      .send(body)
      .expect(200)
      .end(err => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

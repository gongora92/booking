const expect = require('expect')
const request = require('supertest')
const app = require('../app')
const Property = require('../models/property')

describe('/api/properties', () => {
  it('It should return an array with near locations', done => {
    const lat = '40.74917',
      long = '-73.98529'
    request(app)
      .get(`/api/properties?lat=${lat}&long=${long}`)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
  it('It should return bookings', (done) => {
    const propertyId = '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f'
    request(app)
      .get(`api/properties/${propertyId}/bookings`)
      .expect(200)
      .end(err => {
        if (err) {
          return done(err)
        }
        Property.findOne({ propertyId })
          .then(property => {
            expect(property.name).toBeDefined()
            expect(property.propertyId).toBe(propertyId)
            done()
          })
          .catch(e => done(e))
      })
  })
})

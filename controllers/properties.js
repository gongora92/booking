require('../config/mongoose')
const axios = require('axios')
const Property = require('../models/property')

module.exports = {
  getProperties: async (req, res) => {
    const { lat, long } = req.query
    if (lat == null || long == null) {
      return res.status(400).send()
    }
    try {
      let { data } = await axios.get(
        `https://places.ls.hereapi.com/places/v1/discover/explore?at=${
          lat + ',' + long
        }&cat=accommodation&apiKey=${process.env.HEREKEY}`
      )
      let properties = data.results.items.map(property => ({
        name: property.title,
        rating: property.averageRating,
        address: property.vicinity,
        id: property.id,
        url: property.hrf
      }))
      res.json(properties)
    } catch ({ response }) {
      res.status(500).send()
    }
  },
  getBookings: async (req, res) => {
    try {
      let property = await Property.findOne({
        propertyId: req.params.id,
      }).populate({
        path: 'bookings',
        options: {
          sort: '-createdAt'
        }
      })
      if (property) {
        let information = {}
        information.hotelName = property.name
        information.bookings = property.bookings.map(booking => {
          return {
            guestName: booking.guestName,
            startDate: booking.startDate,
            endDate: booking.endDate,
            guestNumber: booking.contactNumber
          }
        })
        res.status(200).json(information)
      } else {
        res.status(200).json({ response: 'There is any booking for the selected property'})
      }
    } catch (ex) {
      res.status(500).json(ex)
    }
  }
}

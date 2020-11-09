require('../config/mongoose')
const axios = require('axios')
const Booking = require('../models/booking')
const Property = require('../models/property')

module.exports = {
  newBooking: async (req, res) => {
    try {
      let { propertyId } = req.body
      let propertyExists = await Property.findOne({ propertyId })
      let newProperty
      if (!propertyExists) {
        let { data } = await axios.get(
          `https://places.ls.hereapi.com/places/v1/places/lookup?source=sharing&id=${propertyId}&apiKey=${process.env.HEREKEY}`
        )
        newProperty = new Property({
          name: data.name,
          propertyId: data.placeId,
          address: data.location.address.text,
          contactNumber: data.contacts.phone[0].value
        })
        await newProperty.save()
      }
      let body = req.body
      let newBooking = new Booking(body)
      await newBooking.save()
      const PROPERTY = propertyExists || newProperty
      PROPERTY.bookings.push(newBooking._id)
      await PROPERTY.save()
    } catch (ex) {
      return res.status(500).json(ex)
    }
    res.status(200).send()
  }
}

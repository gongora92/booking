const joi = require('@hapi/joi')

module.exports = {
  schemas: {
    bookingSchema: joi.object({
       propertyId: joi.string().required(),
       startDate: joi.date().greater('now').required(),
       endDate: joi.date().greater(joi.ref('startDate')).required(),
       guestName: joi.string().required(),
       contactNumber: joi.number().required()
      })
  },
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body)
      if (result.error) return res.status(422).json(result.error)
      else next()
    }
  }
}



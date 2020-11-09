const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose
  .connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('The connection to mongoDB was succesfully'))
  .catch((err) => console.error('The connection to mongoDB failed', err))

module.exports = {
  mongoose
}

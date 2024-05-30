const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)  
})

const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: {type: String, required: true}
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', personSchema)
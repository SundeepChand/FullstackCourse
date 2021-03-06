const mongoose = require('mongoose')
const uniqueIdentifier = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB:', error)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})
personSchema.plugin(uniqueIdentifier)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

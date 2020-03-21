require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.post('/api/persons', (request, response, next) => {
  const person = new Person(request.body)
  person.save()
    .then(result => {
      console.log('saved')
      response.json(result)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
    .catch(error => {
      console.log('Unable to find the person', error)
      res.status(404).end()
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/info', (req, res, next) => {
  Person.estimatedDocumentCount()
    .then(count => {
      console.log(count)
      const str = `Phonebook has info for ${count} people<br><br>${new Date()}`
      res.send(str)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

// Handle requests to unknown URLs.
app.use((req, res) => {
  res.status(404).send({ error: 'Request made to unknown URL' })
})

// Define the error-handler middleware.
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async(req, res) => {
  const savedUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(savedUsers.map(u => u.toJSON()))
})

usersRouter.post('/', async(req, res, next) => {
  const body = req.body

  // Check if both username & password are there.
  if (!(body.username && body.password)) {
    return res.status(400).json({ error: 'missing username or password' })
  }

  // Check password length > 3
  if (body.password.length < 3) {
    return res.status(400).json({ error: 'min password length is 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name === undefined ? body.username : body.name,
    passwordHash: passwordHash
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter

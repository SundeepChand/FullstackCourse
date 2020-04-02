const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const addUser = () => {
  // Define the user who will add the blog
  const user = {
    username: 'user1',
    password: 'pass1',
    name: 'John Doe'
  }
  const userObject = User(user)
  return userObject.save()
    .then(() => {
      return User.find({})
        .then(savedUser => {
          return savedUser
        })
    })
}

const getToken = (user) => {
  // Generate the token for the user.
  const userForToken = {
    username: user.username,
    id: user._id
  }
  return jwt.sign(userForToken, config.SECRET)
}

module.exports = {
  addUser,
  getToken
}

const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

describe('when a user already exists in the db', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const newUser = new User({
      username: 'root',
      password: 'root'
    })
    await newUser.save()
  })

  test('user is not added if username already exists', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      password: 'admin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    const usernames = usersAtEnd.map(u => u.username)

    expect(usersAtEnd.length).toBe(usersAtStart.length)
    expect(usernames).toContain(newUser.username)
  })


  test('a valid user is successfully added', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'admin',
      password: 'admin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    const usernames = usersAtEnd.map(u => u.username)

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('a user having username < 3 characters long', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'aa',
      password: 'admin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    const usernames = usersAtEnd.map(u => u.username)

    expect(usersAtEnd.length).toBe(usersAtStart.length)
    expect(usernames).not.toContain(newUser.username)
  })

  test('a user having password < 3 characters long', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'admin',
      password: 'aa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    const usernames = usersAtEnd.map(u => u.username)

    expect(usersAtEnd.length).toBe(usersAtStart.length)
    expect(usernames).not.toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

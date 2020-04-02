const mongoose = require('mongoose')
const supertest = require('supertest')
const testBlogs = require('./testBlogs')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./saveUserHelper')
const app = require('../app')

const api = supertest(app)
let userToken = null // Stores the token for the user.

beforeEach(async() => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const savedUser = await helper.addUser()

  // Add the blogs.
  const blogObjects = testBlogs.listWithFiveBlogs.map(b => {
    b.user = savedUser[0]._id
    return Blog(b)
  })
  const blogPromises = blogObjects.map(b => b.save())

  await Promise.all(blogPromises)

  userToken = helper.getToken(savedUser[0]) // get the jwt token for the user.
})

describe('when some blogs are already present', () => {
  test('get request returns all the blogs', async() => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(testBlogs.listWithFiveBlogs.length)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(testBlogs.listWithFiveBlogs[0].title)
  })

  test('unique identifier is named id', async() => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of new notes', () => {
  test('a new note is successfully added', async() => {
    const newNote = {
      title: 'New blog from test',
      author: 'Sundeep Chand',
      url: 'www.google.com',
      likes: 0
    }

    await api
      .post('/api/blogs/')
      .set({ 'Authorization': `Bearer ${userToken}` })
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedNotes = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const titles = returnedNotes.body.map(r => r.title)
    expect(titles).toContain(newNote.title)
  })

  test('if likes is undefined then the default value is 0', async() => {
    const newNote = {
      title: 'New blog from test',
      author: 'Sundeep Chand',
      url: 'www.google.com'
    }

    const result = await api
      .post('/api/blogs/')
      .set({ 'Authorization': `Bearer ${userToken}` })
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(0)
  })


  test('when title & url are undefined 400 status code is returned', async() => {
    const newNote1 = {
      author: 'Sundeep Chand',
      url: 'www.google.com'
    }

    const newNote2 = {
      title: 'New blog from test',
      author: 'Sundeep Chand',
    }

    await api
      .post('/api/blogs/')
      .send(newNote1)
      .expect(400)

    await api
      .post('/api/blogs/')
      .send(newNote2)
      .expect(400)
  })
})

describe('tests for the update functionality', () => {
  test('a valid note is replaced successfully', async() => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)

    const id = response.body[0].id
    const firstNoteTitle = response.body[0].title

    const newBlog = {
      title: 'Replacement blog',
      author: 'Sundeep Chand',
      url: 'www.google.com'
    }

    await api
      .put(`/api/blogs/${id}`)
      .set({ 'Authorization': `Bearer ${userToken}` })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newResponse = await api
      .get('/api/blogs/')
      .expect(200)

    const newTitles = newResponse.body.map(r => r.title)

    expect(newTitles).toContain(newBlog.title)
    expect(newTitles).not.toContain(firstNoteTitle)
  })

  test('if id is not valid, 400 is returned', async() => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('if request is made to non-existent id, then 404 is returned', async() => {
    const newBlog = {
      title: 'Replacement blog',
      author: 'Sundeep Chand',
      url: 'www.google.com'
    }

    const blogObject = new Blog(newBlog)

    await blogObject.save()
    await blogObject.remove()

    await api
      .put(`/api/blogs/${blogObject._id.toString()}`)
      .set({ 'Authorization': `Bearer ${userToken}` })
      .send(newBlog)
      .expect(404)
  })

  test('if author or title or url is not passed then, 400 is returned', async() => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)

    const id = response.body[0].id

    const newBlog = {
      author: 'Sundeep Chand',
      url: 'www.google.com'
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of blogs', () => {
  test('a valid id is deleted successfully', async() => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)

    const id = response.body[0].id

    await api
      .delete(`/api/blogs/${id}`)
      .set({ 'Authorization': `Bearer ${userToken}` })
      .expect(204)
  })

  test('an invalid id returns a status code of 400', async() => {
    const invalidId = '5a3d5da5907008182a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set({ 'Authorization': `Bearer ${userToken}` })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

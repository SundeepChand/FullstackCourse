const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  const blogsToBeReturned = blogs.map(b => b.toJSON())
  response.json(blogsToBeReturned)
})

blogRouter.post('/', async(request, response) => {
  const body = request.body

  if (body.title === undefined || body.author === undefined ||
    body.url === undefined) {

    return response.status(400).end()
  }

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes === undefined || body.likes === '' ? 0 : body.likes
    }
    const blogObject = new Blog(newBlog)

    const result = await blogObject.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    result.user = user
    console.log(result.toJSON())
    response.status(201).json(result.toJSON())
  } catch (error) {
    response.status(401).json({ error: 'token missing or invalid' })
  }
})

blogRouter.put('/:id', async(req, res) => {
  if (req.body.title === undefined || req.body.author === undefined ||
    req.body.url === undefined) {

    return res.status(400).end()
  }

  const blogToBeUpdated = await Blog.findById(req.params.id)
  if (!blogToBeUpdated) {
    // The requested blog does not exist.
    return res.status(404).end()
  }
  const user = await User.findById(req.body.user)
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    user: user.id,
    likes: req.body.likes === undefined ? 0 : req.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

blogRouter.delete('/:id', async(req, res, next) => {
  let blogToBeDeleted
  try {
    blogToBeDeleted = await Blog.findById(req.params.id)
  } catch (error) {
    return next(error)
  }

  try {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (blogToBeDeleted.user.toString() === decodedToken.id.toString()) {
      const user = await User.findById(decodedToken.id)
      const newBlogs = user.blogs.filter(id => id.toString() !== req.params.id)

      user.blogs = newBlogs
      await user.save()

      await blogToBeDeleted.remove()
      return res.status(204).end()
    }
    return res.status(401).json({ error: 'a list can only be deleted by its user' })
  } catch (error) {
    res.status(401).json({ error: 'token missing or invalid' })
  }
})

module.exports = blogRouter

import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      // Sort the blogs.
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()

    try {

      const returnedUser = await loginService.login({ username, password })
      setUser(returnedUser)
      window.localStorage.setItem('user', JSON.stringify(returnedUser))
      blogService.setToken(returnedUser.token)
      setUsername('')
      setPassword('')

    } catch(error) {
      setMessage('Invalid credentials! Unable to login')
      setError(true)

      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()

    setMessage('Successfully Logged out')
    setError(false)

    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 5000)
  }

  const handleBlogSubmit = async(newBlog) => {
    blogService.setToken(user.token)

    try {

      const returnedBlog = await blogService.addNew(newBlog)

      setBlogs(blogs.concat(returnedBlog))

      setMessage(`Successfully added "${returnedBlog.title}" by "${returnedBlog.author}"`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)

    } catch(error) {

      setMessage('Could not save to server')
      setError(true)

      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)

    }
  }

  const updateLike = async (newBlog) => {
    const updatedBlog = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      likes: newBlog.likes + 1,
      user: newBlog.user.id
    }

    const response = await blogService.updateBlog(newBlog.id, updatedBlog)

    const index = blogs.map(b => b.id).findIndex(el => el === newBlog.id)
    const newBlogs = blogs.map((b, i) => i === index ? { ...b, likes: response.likes } : b)
    newBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(newBlogs)
  }

  const deleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      await blogService.deleteBlog(id)

      setBlogs(blogs.filter(b => b.id !== id))

      setMessage('Successfully removed the blog')
      setError(true)

      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} error={error} />
        <form onSubmit={handleLoginFormSubmit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => { setUsername(target.value) }}
              required />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => { setPassword(target.value) }}
              required />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
      <div>
        <p>
          {user.name} is logged in.
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>

      <Toggleable buttonLabel="New Blog">
        <BlogForm handleSubmit={handleBlogSubmit} />
      </Toggleable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLike={updateLike} deleteBlog={() => { deleteBlog(blog.id, blog.title, blog.author) }} />
        )}
      </div>
    </div>
  )
}

export default App

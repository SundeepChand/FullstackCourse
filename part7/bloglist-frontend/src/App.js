import React, { useState, useEffect } from 'react'

import Blog from './components/BlogLink'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
      dispatch(initUser())
  }, [dispatch])

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    window.history.pushState(null, null, '/')
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
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
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />

      <h2>blogs</h2>
      <Switch>
        <Route path='/blogs/:id'>
          <SingleBlog />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <div>
            <Notification notification={notification} />

            <Toggleable buttonLabel="New Blog">
              <BlogForm />
            </Toggleable>

            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

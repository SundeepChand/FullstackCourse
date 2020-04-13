import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const blogStyle = {
    padding: 5,
    margin: 5,
    border: '2px solid black',
  }

  let loggedInUser = window.localStorage.getItem('user')
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser)
  }

  const showDelete = () => {
    if (loggedInUser && loggedInUser.username === blog.user.username) {
      return (
        <React.Fragment>
          <button onClick={deleteBlog}>remove</button><br/>
        </React.Fragment>
      )
    }
  }

  return (
    <div className="bloglist" style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <Toggleable buttonLabel="view">
        {blog.url}<br/>
      Likes: <span className="likes">{blog.likes}</span> <button onClick={() => { updateLike(blog) }}>like</button><br/>
        {blog.user.username}<br/>
        {showDelete()}
      </Toggleable>
    </div>
  )}

export default Blog

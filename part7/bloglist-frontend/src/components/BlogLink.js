import React from 'react'
import { Link } from 'react-router-dom'

const blogStyle = {
  padding: 5,
  margin: 5,
  border: '2px solid black',
}

const Blog = ({ blog }) => {
  return (
    <div className="bloglist" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}><p>{blog.title}</p></Link>
    </div>
  )}

export default Blog

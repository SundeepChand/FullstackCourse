import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const showBlogs = (blogs) => {
  return blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
}

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.usersList.find(user => user.id === id))
  if (!user) {
    return <Redirect to='/users' />
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>{'added blogs'}</h3>
      <ul>
        {showBlogs(user.blogs)}
      </ul>
    </div>
  )
}

export default User

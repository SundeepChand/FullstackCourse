import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'


const SingleBlog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => id === blog.id))

  if (!blog) {
    return <Redirect to='/' />
  }

  let loggedInUser = window.localStorage.getItem('user')
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser)
  }

  const handleDeleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
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

    dispatch(updateLikes(newBlog.id, updatedBlog))
  }

  const showDelete = (deleteBlog) => {
    if (loggedInUser && loggedInUser.username === blog.user.username) {
      return (
        <React.Fragment>
          <button onClick={deleteBlog}>remove</button><br/>
        </React.Fragment>
      )
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />

      <span className="likes">{blog.likes}</span> likes
      &nbsp;&nbsp;
      <button onClick={() => { updateLike(blog) }}>like</button>
      <br />

      added by {blog.user.username}<br/>
      {showDelete(() =>
        handleDeleteBlog(blog.id, blog.title, blog.author)
      )}
    </div>
  )
}

export default SingleBlog

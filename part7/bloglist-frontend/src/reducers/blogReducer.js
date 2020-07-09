import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  let id, newState

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)

    case 'ADD_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes)

    case 'UPDATE_LIKES':
      id = action.data.id
      const blogToBeChanged = state.find(blog => blog.id === id)
      const newBlog = {
        ...blogToBeChanged,
        likes: blogToBeChanged.likes + 1
      }

      newState = state.map(blog => blog.id === id ? newBlog : blog)
      return newState.sort((a, b) => b.likes - a.likes)

    case 'DELETE_BLOG':
      id = action.data.id
      newState = state.filter(blog => blog.id !== id)
      return newState.sort((a, b) => b.likes - a.likes)

    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {

    try {

      const data = await blogService.addNew(newBlog)
      dispatch({
        type: 'ADD_BLOG',
        data
      })
      dispatch(setNotification(`Successfully added "${data.title}" by "${data.author}"`, false))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)

    } catch(error) {

      dispatch(setNotification('Could not save to server', true))

      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)

    }
  }
}

export const updateLikes = (id, updatedBlog) => {
  return async dispatch => {

    try {
      await blogService.updateBlog(id, updatedBlog)
      dispatch({
        type: 'UPDATE_LIKES',
        data: { id }
      })

    } catch (error) {

      console.log(error)

    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {

    try {
      await blogService.deleteBlog(id)

      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })

      dispatch(setNotification('Successfully removed the blog', true))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)

    } catch(error) {

      console.log(error)

    }
  }
}

export default blogsReducer

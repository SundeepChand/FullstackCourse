import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data

    case 'LOGIN_USER':
      return action.data

    case 'LOGOUT_USER':
      return null

    default:
      return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      blogService.setToken(parsedUser.token)
      dispatch({
        type: 'INIT_USER',
        data: parsedUser
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {

    try {

      const returnedUser = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN_USER',
        data: returnedUser
      })

      window.localStorage.setItem('user', JSON.stringify(returnedUser))
      blogService.setToken(returnedUser.token)
      window.history.pushState(null, null, '/')

    } catch(error) {

      dispatch(setNotification('Invalid credentials! Unable to login', true))

      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)

    }
  }
}

export const logoutUser = () => {
  return async dispatch => {

    blogService.setToken(null)
    window.localStorage.clear()

    dispatch({
      type: 'LOGOUT_USER'
    })

    dispatch(setNotification('Successfully Logged out', false))
    window.history.pushState(null, null, '/')

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}

export default userReducer

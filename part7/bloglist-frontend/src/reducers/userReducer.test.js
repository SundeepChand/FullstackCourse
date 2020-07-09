import userReducer, { setUser } from './userReducer'
import deepFreeze from 'deep-freeze'

describe('User reducer', () => {
  test('user is set to action.data with SET_USER', () => {
    const initialState = {}

    const user = {
      name: 'Matti Luukkainen',
      token: 'user.token.auth',
      username: 'mluukkai'
    }

    const state = initialState
    deepFreeze(state)

    let newState = userReducer(state, setUser(user))
    expect(newState).toEqual(user)

    newState = userReducer(state, setUser(null))
    expect(newState).toEqual(null)
  })
})

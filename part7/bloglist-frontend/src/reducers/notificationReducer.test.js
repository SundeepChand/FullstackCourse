import notificationReducer, { setNotification } from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('message is set with SET_NOTIFICATION', () => {
    const state = {}

    deepFreeze(state)
    let newState = notificationReducer(state, setNotification('Hello', false))
    expect(newState).toEqual({ message: 'Hello', error: false})

    newState = notificationReducer(newState, setNotification('Error', true))
    expect(newState).toEqual({ message: 'Error', error: true})
  })
})

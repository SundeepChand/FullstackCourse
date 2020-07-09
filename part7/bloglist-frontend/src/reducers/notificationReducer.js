const notificationReducer = (state = { message: null, error: null }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    default:
      return state
  }
}

export const setNotification = (message, error=null) => (
  {
    type: 'SET_NOTIFICATION',
    data: {
      message,
      error
    }
  }
)

export default notificationReducer

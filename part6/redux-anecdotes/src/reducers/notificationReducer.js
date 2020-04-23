const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'CHANGE_MESSAGE':
        return action.notification
      default:
        return state
  }
}

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_MESSAGE',
      notification
    })
    window.setTimeout(() => {
      let id = window.setTimeout(() => {}, 0)

      while (id--) {
          window.clearTimeout(id)
      }
      dispatch({ type: 'CHANGE_MESSAGE', notification: '' })
    }, time * 1000)
  }
}

export default notificationReducer
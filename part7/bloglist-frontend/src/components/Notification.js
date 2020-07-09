import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  } else {
    return (
      <div className={notification.error ? 'error' : 'success'}>
        {notification.message}
      </div>
    )
  }
}

export default Notification

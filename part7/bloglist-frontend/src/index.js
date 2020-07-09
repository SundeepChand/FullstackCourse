import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersListReducer from './reducers/usersListReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer =  combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  usersList: usersListReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

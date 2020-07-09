import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initUsersList } from '../reducers/usersListReducer'

const showUsers = (users) => {
  return users.map(user =>
    <tr key={user.id}>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.usersList)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(initUsersList())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {showUsers(users)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

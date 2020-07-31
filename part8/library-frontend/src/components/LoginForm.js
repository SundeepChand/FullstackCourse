import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

export default function LoginForm({ setLoggedIn, show, setPage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onCompleted: () => {
      setPage('authors')
    },
    onError: error => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setLoggedIn(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setLoggedIn])

  const handleLoginFormSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }
  
  return (
    <form onSubmit={handleLoginFormSubmit}>
      <div>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => { setUsername(target.value) }}
          required 
        />
      </div>
      <div>
        Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}
            required 
          />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

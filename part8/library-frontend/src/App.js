import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import YearForm from './components/YearForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery } from '@apollo/client'
import { ME } from './queries'

const renderNav = (loggedIn, setPage, logout) => {
  if (loggedIn) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommend')}>for you</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => { logout() }}>logout</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('login')}>login</button>
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const currentUser = useQuery(ME, {
    onCompleted: () => {
        console.log(currentUser.data)
    }
  })

  const logout = () => {
    console.log('logout')
    setLoggedIn(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      { renderNav(loggedIn, setPage, logout) }

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <YearForm
        show={page === 'authors'}
      />

      <LoginForm
        show={page === 'login'}
        setLoggedIn={setLoggedIn}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommend'}
        currentUser={currentUser}
      />

    </div>
  )
}

export default App
import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNew = (event) => {
    event.preventDefault()
    const newText = event.target.anecdote.value
    console.log(newText)
    event.target.anecdote.value = ''

    props.addAnecdote(newText)
    props.setNotification(`Successfully added "${newText}".`, 5)
  }

  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote" required /></div>
        <button type='submit'>create</button>
      </form>
    </React.Fragment>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(undefined, mapDispatchToProps)(AnecdoteForm)
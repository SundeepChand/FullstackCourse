import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    props.increaseVote(anecdote)
    props.setNotification(`You voted for "${anecdotes.find(a => a.id === anecdote.id).content}".`, 5)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)),
  }
}

const mapDispatchToProps = {
  increaseVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
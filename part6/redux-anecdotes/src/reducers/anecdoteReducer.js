import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'ADD_NEW':
      return [...state, action.data]

    case 'INIT_STATE':
      return action.data

    case 'UP_VOTE':
      const anecdoteToBeUpdated = state.find(a => a.id === action.data.id)
      const newAnecdote = {...anecdoteToBeUpdated, votes: anecdoteToBeUpdated.votes + 1}
      const newState = state.map(a => a.id === action.data.id ? newAnecdote : a)
      newState.sort((a, b) => b.votes - a.votes)

      return newState

    default:
      return state
  }
}

export const increaseVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'UP_VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.addNew(content)
    dispatch({
      type: 'ADD_NEW',
      data
    })
  }
}

export const initializeState = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_STATE',
      data
    })
  }
}
 
export default reducer
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header2 = ({title}) => <h2>{title}</h2>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  // Function handler for next quote button.
  const generateNewIndex = () => {
      const newIndex = Math.floor(Math.random() * anecdotes.length)
      return newIndex
  }

  // Function to increase the vote count & find the quote with max vote (calls getMaxVoteIndex)
  const incrementVote = () => {
      const newVotes = [...votes]
      newVotes[selected]++
      setVotes(newVotes)
      setMaxIndex(getMaxVotesIndex(newVotes))
  }

  // Helper function to find index of quote with maximum number of votes
  const getMaxVotesIndex = (arr) => {
      let maxIndex = 0
      
      for (let i = 1; i < arr.length; i++)
      {
          if (arr[i] > arr[maxIndex])
              maxIndex = i
      }

      return maxIndex
  }

  return (
    <div>
      <Header2 title={"Anecdote of the day"} />
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button onClick={() => {incrementVote()}} text={"Vote"} />
      <Button onClick={() => {setSelected(generateNewIndex)}} text={"Next quote"} />

      <Header2 title={"Anecdote with most votes"} />
      {props.anecdotes[maxIndex]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
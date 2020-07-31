import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BookTable'

const renderButtons = (allGenres, setGenreToShow) => {
  const buttonsToRender = []
  allGenres.forEach((g, index) => {
    buttonsToRender.push(
      <button
        style={{textTransform: 'capitalize'}}
        key={index}
        onClick={() => setGenreToShow(g)}
      >
        {g}
      </button>)
  })
  buttonsToRender.push(
    <button
      style={{textTransform: 'capitalize'}}
      key={allGenres.size} 
      onClick={() => setGenreToShow('all')}
    >
      All
    </button>)
  return buttonsToRender
}

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreToShow, setGenreToShow] = useState('all') 

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  let allGenres = new Set()
  books.forEach(book => {
    book.genres.forEach(g => {
      allGenres.add(g)
    })
  })
  
  const booksToShow = genreToShow === 'all' ? books : books.filter(book => book.genres.includes(genreToShow))
  return (
    <div>
      <h2>books</h2>

      <BooksTable booksToShow={booksToShow} />

      <div>
        { renderButtons(allGenres, setGenreToShow) }
      </div>
    </div>
  )
}

export default Books
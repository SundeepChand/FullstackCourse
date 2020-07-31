import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BookTable'

export default function Recommendations({ show, currentUser }) { 
    const allBooks = useQuery(ALL_BOOKS)

    if (!show) {
        return null
    }

    if (currentUser.loading || allBooks.loading) {
        return <div>loading...</div>
    }

    console.log(currentUser.data.me)
    const booksToShow = allBooks.data.allBooks.filter(book => book.genres.includes(currentUser.data.me.favouriteGenre))
    return (
        <div>
            <h2>For You</h2>
            <p>Books in your favourite genre <strong>{currentUser.data.favouriteGenre}</strong></p>
            <BooksTable booksToShow={booksToShow} />
        </div>
    )
}
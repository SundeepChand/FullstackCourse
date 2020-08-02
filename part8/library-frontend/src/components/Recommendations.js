import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import BooksTable from './BookTable'

export default function Recommendations({ show, currentUser }) {
    const [userBooks, setUserBooks] = useState(null)

    const [fetchBooks, data] = useLazyQuery(BOOKS_BY_GENRE, {
        onCompleted: () => {
            setUserBooks(data.data.allBooks)
        }
    })

    useEffect(() => {
        if (currentUser) {
            fetchBooks({ variables: { genre: currentUser.favouriteGenre } })
        }
    }, [currentUser, fetchBooks])

    if (!show) {
        return null
    }

    if (fetchBooks.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>For You</h2>
            <p>Books in your favourite genre <strong>{currentUser.favouriteGenre}</strong></p>
            <BooksTable booksToShow={userBooks} />
        </div>
    )
}
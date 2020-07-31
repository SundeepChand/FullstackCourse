import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const YearForm = ({ show }) => {
    const [name, setName] = useState('')
    const [year, setYear] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    const result = useQuery(ALL_AUTHORS)

    if (!show) {
        return null
    }

    if (result.loading) {
        return (
            <div>loading...</div>
        )
    }

    const authorsName = result.data.allAuthors.map(a => a.name)

    const handleFormSubmit = (event) => {
        event.preventDefault()

        editAuthor({ variables: {name, setBornTo: Number(year)}})

        setName(authorsName[0])
        setYear('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>

            <form onSubmit={handleFormSubmit}>
                <div>
                    author: 
                    <select value={name} onChange={event => setName(event.target.value)}>
                        {
                            authorsName.map((a, index) => <option key={index} value={a}>{a}</option>)
                        }
                    </select>
                </div>
                <div>
                        born:
                        <input value={year} onChange={event => setYear(event.target.value)} />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default YearForm
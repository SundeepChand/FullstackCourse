import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const records = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '1234-465718',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '322-456784',
    },
    {
        id: 3,
        name: 'John Doe',
        number: '23747-2884',
    },
    {
        id: 4,
        name: 'Jane Doe',
        number: '56747-2884',
    },
    { 
        id: 5,
        name: 'Dan Abramov',
        number: '12-43-234345' 
    },
    { 
        id: 6,
        name: 'Mary Poppendieck', 
        number: '39-23-6423122'
    }
]

ReactDOM.render(<App records={records} />, document.getElementById('root'))
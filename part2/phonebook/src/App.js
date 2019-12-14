import React, {useState, useEffect} from 'react';
import Records from './components/Records'
import AddForm from './components/AddForm'
import Filter  from './components/Filter'
import axios from 'axios'

function App() {
    // State for the record elements.
    const [records, setRecords] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchInput, setSearchInput] = useState('')

    // Fetch the records from the server using axios.
    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setRecords(response.data)
        })
    }, [])

    // Create an array of records to show
    // This will be used in the filter.
    let recordsToShow = records.filter((record) => record.name.toLowerCase().includes(searchInput.toLowerCase()))

    // handles the click event of the button.
    const handleClick = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '') {
            alert('Please complete the form')
        }
        // add a new record if it does not exist.
        else if (records.map((record) => record.name.toLowerCase()).indexOf(newName.toLowerCase()) === -1) {
            const newRecord = {
                id: records.length + 1,
                name: newName,
                number: newNumber,
            }
            setRecords(records.concat(newRecord))
            setNewName('')
            setNewNumber('')
        }
        else {
            alert(`${newName} already exits.`)
            setNewName('')
            setNewNumber('')
        }
    }

    // handles the input field
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    // handles the search field
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
        recordsToShow = records.filter((record) => record.name.toLowerCase().includes(searchInput.toLowerCase()))
    }

    const searchResult = recordsToShow.length === 0 ? <p>No results found.</p> : <Records records={recordsToShow} />

    return (
        <React.Fragment>
            <h2>Phonebook</h2>
            <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
            <h3>Add New</h3>
            <AddForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} 
                        handleNameChange={handleNameChange} handleClick={handleClick} />
            <h2>Numbers</h2>
            {searchResult}
        </React.Fragment>
    )
}

export default App

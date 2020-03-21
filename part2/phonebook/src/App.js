import React, {useState, useEffect} from 'react';
import Records from './components/Records'
import AddForm from './components/AddForm'
import Filter  from './components/Filter'
import SuccessBox from './components/SuccessBox'
import ErrorBox from './components/ErrorBox'
import serverComm from './services/serverComm'

function App() {
    // State for the record elements.
    const [records, setRecords] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    // Fetch the records from the server using axios.
    useEffect(() => {
        serverComm
        .getAll()
        .then(responseData => {
            setRecords(responseData)
        })
    }, [])

    // Create an array of records to show
    // This will be used in the filter.
    let recordsToShow = records.filter((record) => 
        record.name.toLowerCase().includes(searchInput.toLowerCase())
    )

    // handles the click event of the button.
    const handleClick = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '') {
            alert('Please complete the form')
        }
        // add a new record if it does not exist.
        else if (records.map((record) => record.name.toLowerCase()).indexOf(newName.toLowerCase()) === -1) {
            const newRecord = {
                name: newName,
                number: newNumber,
            }
            console.log("adding note...")
            serverComm
            .addNew(newRecord)
            .then(responseData => {
                console.log('Exec in then')
                setRecords(records.concat(responseData))
                
                setSuccessMessage(`Successfully added ${newName}.`)
                
                setNewName('')
                setNewNumber('')

                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            })
            .catch(error => {
                setErrorMessage(error.response.data.error)

                setNewName('')
                setNewNumber('')
                
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)                
            })

        } else {
            // Update the record then.
            if (window.confirm(`${newName} already exits.. Do you want to change the number?`)) {
                
                const id = records[records.map((record) => 
                    record.name.toLowerCase()).indexOf(newName.toLowerCase())
                ].id
                        
                const newRecord = { name: newName, number: newNumber }

                serverComm
                .update(id, newRecord)
                .then(responseData => {
                    setRecords(records.map(record => record.id === id ? responseData : record))
                    console.log(responseData)
                    
                    setSuccessMessage(`Successfully updated ${newName}.`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 3000)

                })
                .catch(() => {
                    setErrorMessage(`${newName} has already been deleted.`)

                    setRecords(records.filter((record) => record.name.toLowerCase() !== newName.toLowerCase()))
                    
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 2000)
                })

                setNewName('')
                setNewNumber('')
            }
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

    // handles the deletion of records
    const deleteRecordById = (id) => {
        if (window.confirm('Do you really want to delete the phone record?'))
        {
            serverComm
            .deleteRecord(id)
            .then(() => {
                console.log(`Deleted ${id}`)
                setRecords(records.filter(record => record.id !== id))
            })
            .catch(error => {
                setErrorMessage(`${records.find((record) => record.id === id).name} has already been deleted.`)

                setRecords(records.filter((record) => record.id !== id))

                setTimeout(() => {
                    setErrorMessage(null)
                }, 2000)
            })
        }
    }

    const searchResult = recordsToShow.length === 0 ? <p>No results found.</p> : <Records records={recordsToShow} deleteRecordById={deleteRecordById} />

    return (
        <React.Fragment>
            <h2>Phonebook</h2>
            
            <SuccessBox message={successMessage} />
            <ErrorBox message={errorMessage} />

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

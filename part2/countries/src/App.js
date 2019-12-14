import React, {useState, useEffect} from 'react'
import CountriesList from './components/CountriesList'
import axios from 'axios'

const App = () => {
    const [countryInput, setCountryInput] = useState('')
    const [countries, setCountries] = useState([])

    const countriesToShow = countries.filter((country) => country.name.toLowerCase().includes(countryInput.toLowerCase()))

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            setCountries(response.data)
        })  
    }, [])

    return(
        <React.Fragment>
            <h1>Countries App</h1>
            Find countries: 
            <input value={countryInput} onChange={(event) => {setCountryInput(event.target.value)}}></input>
            <br></br>
            <CountriesList countries={countriesToShow} />
        </React.Fragment>
    )
}

export default App

import React from 'react'
import CountryData from './CountryData'
import CountryRecord from './CountryRecord'

const CountriesList = ({countries}) => {

    const generateCountryList = () => {
        return countries.map((country) => <CountryRecord key={country.numericCode} country={country} />)
    }

    if (countries.length > 10) {
        return(
            <p>Too many matches, type more filters.</p>
        )
    } else if (countries.length <= 0) {
        return(
            <p>No results found.</p>
        )
    } else if (countries.length === 1) {
        return(
            <CountryData country={countries[0]} />
        )
    }
    return(
        <ol>
            {generateCountryList()}
        </ol>
    )
}

export default CountriesList
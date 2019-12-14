import React from 'react'
import Weather from './Weather'

const CountryData = ({country}) => {
    const getLanguages = () => {
        return country.languages.map((language, index) => <li key={index}>{language.name}</li>)
    }

    return(
        <React.Fragment>
            <h2>{country.name}</h2>
            <p>
                Capital: {country.capital}
                <br></br>
                Population: {country.population}
            </p>
            <h3>Languages</h3>
            <ul>
                {getLanguages()}
            </ul>
            <img src={country.flag} alt={`${country.name} flag`} width="300px" height="250px" />
            <br></br>
            <Weather city={country.capital} />
            <br></br>
        </React.Fragment>
    )
}

export default CountryData
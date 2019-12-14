import React, {useState} from 'react'
import CountryData from './CountryData'

const CountryRecord = ({country}) => {
    const [showCountry, setShowCountry] = useState(false)

    const showButtonClicked = () => {
        setShowCountry(!showCountry)
    }

    if (!showCountry) {
        return(
            <React.Fragment>
                <li>{country.name} <button onClick={showButtonClicked}>{showCountry ? 'Hide' : 'Show'}</button></li>
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <li>{country.name} <button onClick={showButtonClicked}>{showCountry ? 'Hide' : 'Show'}</button></li>
                <CountryData country={country} />
            </React.Fragment>
        )
    }
}

export default CountryRecord
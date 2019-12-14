import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_KEY)
        .then((response) => {
            setWeatherData(response.data)
        })
    }, [city])

    if (weatherData != null) {
        return(
            <React.Fragment>
                <h2>{`Current weather in ${city}`}</h2>
                Temperature: {weatherData.current.temperature} &deg;C
                <br></br>
                <img src={weatherData.current.weather_icons[0]} width="100px" height="100px" alt="Weather icon" />
                <br></br>
                Weather: {weatherData.current.weather_descriptions[0]}
                <br></br>
                Wind: {weatherData.current.wind_speed} km/h, {weatherData.current.wind_dir}
                <br></br>
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment></React.Fragment>
        )
    }
}

export default Weather
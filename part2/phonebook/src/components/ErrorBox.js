import React from 'react'

const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const ErrorBox = ({message}) => {
    if (message == null)
    {
        return null
    }
    return (
        <div style={error}>
            {message}
        </div>
    )
}

export default ErrorBox
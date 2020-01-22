import React from 'react'

const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const SuccessBox = ({message}) => {
    if (message == null)
    {
        return null
    }
    return (
        <div style={success}>
            {message}
        </div>
    )
}

export default SuccessBox
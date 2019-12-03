import React from 'react'

const Record = (props) => <li>{props.record.name} : {props.record.number}</li>

const Records = (props) => {
    const generateRows = () => props.records.map((record) => <Record key={record.id} record={record} />)

    return(
        <ol>
            {generateRows()}
        </ol>
    )
}

export default Records
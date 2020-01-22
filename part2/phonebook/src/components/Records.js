import React from 'react'

const Record = (props) => {
    return(
        <li>
            {props.record.name} : {props.record.number}
            &nbsp;&nbsp;
            <button onClick={props.clickHandler}>Delete</button>
        </li>
    )
}

const Records = (props) => {
    const generateRows = () => {
        return(
            props.records.map((record) => {
                return(
                    <Record key={record.id} record={record} 
                        clickHandler={ () => { 
                            props.deleteRecordById(record.id)
                        } } 
                    />
                )
            })
        )
    }

    return(
        <ol>
            {generateRows()}
        </ol>
    )
}

export default Records
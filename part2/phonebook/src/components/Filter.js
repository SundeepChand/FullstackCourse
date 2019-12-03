import React from 'react'

const Filter = (props) => (
    <div>
        Filter: <input value={props.searchInput} onChange={props.handleSearchChange} />
    </div>
)

export default Filter
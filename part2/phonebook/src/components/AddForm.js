import React from 'react'

const AddForm = (props) => {
    return (
        <form>
              <div>
                  Name: <input value={props.newName} onChange={props.handleNameChange}/>
              </div>
              <div>
                  Phone: <input value={props.newNumber} onChange={props.handleNumberChange} />
              </div>
              <div>
                  <button type="submit" onClick={props.handleClick}>Add</button>
              </div>
          </form>
    )
}

export default AddForm
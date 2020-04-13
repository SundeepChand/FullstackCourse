import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <button onClick={toggleVisible} style={hideWhenVisible}>{props.buttonLabel}</button>

      <div style={showWhenVisible} className="hiddenContent">
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable

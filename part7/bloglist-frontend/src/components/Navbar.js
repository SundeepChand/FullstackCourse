import React from 'react'
import { Link } from 'react-router-dom'

const NavBarStyle = {
  boxSizing: 'border-box',
  width: '100%',
  backgroundColor: 'skyblue',
  padding: '8px',
  height: '40px'
}

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav style={NavBarStyle}>
      <Link to='/'>blogs</Link>
      &nbsp;&nbsp;
      <Link to='/users'>users</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {user.name} is logged in.
      &nbsp;&nbsp;
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar

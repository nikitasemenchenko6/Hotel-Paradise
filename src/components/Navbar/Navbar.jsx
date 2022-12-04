import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext)

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel Paradise</span>
        </Link>
        { user ? 
        <div>
          <span style={{marginRight:"10px"}}>{user.username}</span>
         <button onClick={handleLogout}>Logout</button>
        </div>
         : 
        <div className="navItems">
          <button className="navButton">Register</button>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
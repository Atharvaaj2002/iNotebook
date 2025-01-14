import React from 'react'
import {NavLink, useNavigate, useLocation,  } from "react-router-dom";

const Navbar = () => {
  const handleLogout=()=>{
    let navigate= useNavigate
    localStorage.removeItem('token')
    navigate('/Login')
  }
  let location = useLocation();
  return (
    <div>
<nav className="navbar navbar-expand-lg  navbar-dark  bg-dark ">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==="/home"? "active": ""}`} aria-current="page" to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</NavLink>
        </li>       
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" >
      <NavLink className="btn btn-primary mx-2" to="/login" role="button">Login</NavLink>
        <NavLink className="btn btn-primary mx-2" to="/Signup" role="button">Signup</NavLink>
      </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

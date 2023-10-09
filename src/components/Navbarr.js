import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink,useNavigate } from "react-router-dom";


function Navbarr() {
  const navigate=useNavigate();
  const LogOut=()=>{
    localStorage.removeItem('token')
    navigate('/login');
  }
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <div className="container-fluid">
        <Navbar.Brand href="/">iNotebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink >
            </li>

            
          </Nav>
          {!localStorage.getItem('token')? <form className="d-flex" role="search">
          <li className="nav-item ">
              <NavLink className="btn btn-primary mx-1" aria-current="page" to="/login">Login</NavLink >
              <NavLink className="btn btn-primary mx-1" aria-current="page" to="/signup">Signup</NavLink >
            </li>
      </form>:<button onClick={LogOut} className="btn btn-primary">Log out</button>}

        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navbarr;

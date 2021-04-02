import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarMain = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">LOGO | Enrollment Forecasts</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/"
            exact={true}
          >
            Overview
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/compare">
            Compare Institutions
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/market">
            COVID-19
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMain;

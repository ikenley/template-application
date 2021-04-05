import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
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
        <Nav className="ml-auto">
          <NavDropdown
            title={<span>Resources</span>}
            id="navbar-context-menu"
            className="navbar-context-menu"
            alignRight
          >
            <NavDropdown.Item href="#action/launch_tour_todo">
              Walkthrough
            </NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="/faq.pdf">
              FAQ
            </NavDropdown.Item>
            <NavDropdown.Item href="mailto:todo@todo.com">
              Contact Us
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item target="_blank" href="https://www.google.com">
              Related Resource X
            </NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://www.google.com">
              Related Resource Y
            </NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://www.google.com">
              Related Resource Z
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/logout_todo">
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMain;
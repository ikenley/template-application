import React, { useCallback } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  launchTour?: () => void;
};

const NavbarMain = ({ launchTour }: Props) => {
  const handleTourClick = useCallback(() => {
    if (launchTour) {
      launchTour();
    }
  }, [launchTour]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <span className="d-none d-md-inline">LOGO | </span>Enrollment Scenario
        Explorer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-links">
          <NavLink
            className="nav-link nav-intro"
            activeClassName="active"
            to="/intro"
          >
            Introduction
          </NavLink>
          <NavLink
            className="nav-link nav-overview"
            activeClassName="active"
            to="/"
            exact={true}
          >
            Overview
          </NavLink>
          <NavLink
            className="nav-link nav-compare"
            activeClassName="active"
            to="/compare"
          >
            Compare Institutions
          </NavLink>
          <NavLink
            className="nav-link nav-market"
            activeClassName="active"
            to="/market"
          >
            Market Analysis
          </NavLink>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown
            title={<span>Resources</span>}
            id="navbar-context-menu"
            className="navbar-context-menu"
            alignRight
          >
            {launchTour ? (
              <NavDropdown.Item onClick={handleTourClick}>
                Walkthrough
              </NavDropdown.Item>
            ) : null}
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

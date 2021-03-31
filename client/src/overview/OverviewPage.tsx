import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import FilterPanel from "./FilterPanel";

const ResultPanel = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get("/api/Overview").then(res => {
            setResult(res.data);
        });
    }, [])

    return (
        <div className="overview-page">
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">LOGO | Enrollment Forecasts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Oveview</Nav.Link>
                        <Nav.Link href="#link">Compare Institutions</Nav.Link>
                        <Nav.Link href="#link">COVID-19</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <main role="main" className="container-fluid mt-3">
                <FilterPanel />
                <div>Trend Chart TODO</div>
                <div>Summary stats TODO</div>
                <div>Results grid</div>
                {result ? JSON.stringify(result) : null}
            </main>
        </div>
    )
};

export default ResultPanel;
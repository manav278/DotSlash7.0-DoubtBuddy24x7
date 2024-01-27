import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import { Button, } from 'react-bootstrap';
export default function NavbarComp() {
    return (
        <div>
            
            <Navbar bg="dark" variant="dark" expand="lg">
                <div className='container-fluid mx-2'>
                    <Navbar.Brand href="/" className='h1'>DoubtBuddy24*7</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}
                        {/* <Button variant="secondary">Secondary</Button> */}
                    </Navbar.Collapse>
                </div>
                <div className='mx-3'>
                    <Button className='px-5 text' variant="outline-primary">UserProfile</Button>

                </div>
            </Navbar>
        </div>
    )
}

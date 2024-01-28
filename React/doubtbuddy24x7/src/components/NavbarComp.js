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
                    </Navbar.Collapse>
                </div>
                <div className='mx-3'>
                    <Button className='px-5 text' href='/userprofile' variant="outline-primary">UserProfile</Button>
                </div>
            </Navbar>
        </div>
    )
}

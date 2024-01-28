import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [userinfo, setUserinfo] = useState({});
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" expand="lg">
                <div className='container-fluid mx-2' >
                    <Navbar.Brand href="#" className='h1'>DoubtBuddy24*7</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                </div>
                <div className='mx-3'>
                    <Button className='px-5 text' variant="outline-primary" onClick={() => { loginWithRedirect() }}>Login</Button>
                </div>
            </Navbar>
            <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
                <h1>No Errors Left Behind!!!</h1>
            </div>
            {isAuthenticated && (
                navigate("/home", { state: { "user": user } })
            )}
        </div>
    )
}

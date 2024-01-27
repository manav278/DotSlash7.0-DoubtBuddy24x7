import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const [userinfo, setUserinfo] = useState({});
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <div className="App">
             <Navbar bg="dark" variant="dark" expand="lg">
            <div className='container-fluid mx-2'>
                <Navbar.Brand href="#" className='h1'>DoubtBuddy24*7</Navbar.Brand>
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
                <Button className='px-5 text' variant="outline-primary" onClick={()=>{loginWithRedirect()}}>Login</Button>
      
                    </div>    
            </Navbar>
            {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
            {isAuthenticated && (
                navigate("/home", { state: {"user":user}})
                // <Link to={{pathname:'/home',}}>Gello</Link>
                // <div>
                //     <img src={user.picture} alt={user.name} />
                //     <h2>{user.name}</h2>
                //     <p>{user.email}</p>
                // </div>
            )}
        
        </div>
    )
}

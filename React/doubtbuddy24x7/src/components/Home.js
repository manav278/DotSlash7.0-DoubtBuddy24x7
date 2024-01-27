import React, { useEffect, useState } from 'react'
import Navbar from './NavbarComp'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
export default function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  
  let trimmeduser = user.name.split(" ").join("");
  console.log(trimmeduser);


  useEffect(() => {
    async function adduser(){
      try {
        const url = "http://localhost:3003/user/login";
        let result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "username":user.name,
            "email":trimmeduser+"@gmail.com",
            "onlinestatus":false
        })
        });
        result = await result.json()
        //
        if (result) {
          console.log(result);
        }

       
      } catch (e) {
        console.error(e);
      }
    }
    async function changeStatus() {
      try {
          const url = `http://localhost:3003/user/status/false`;
          let result = await fetch(url);
          result = await result.json()
          //
          if (result) {
              console.log(result);
          }
      } catch (e) {
          console.error(e);
      }
  }
  
    adduser();
    changeStatus();
  }, []);
  return (
    <>
      <Navbar />
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center d-inline">Welcome to DoubtBuddy!.</h1>
          </Col>
        </Row>
        <Row>

          <Col className="text-center">
            <Button variant="primary" onClick={()=>navigate("/doubt/ask")} className="mx-4 px-5 py-3" size='lg'>
              Ask a Doubt?
            </Button>
            <Button variant="primary" onClick={()=>navigate("/solver/wait")} className=' px-5 py-3' size='lg'>
              Solve a Doubt?
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

import React, { useState } from 'react'
import Navbar from './NavbarComp'
import { Button, Col, Container, Row } from 'react-bootstrap'
export default function Home(props) {
  {console.log(props.user);}
  return (
    <>
    <Navbar/>
    
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
    <Row className="mb-4">
        <Col>
          <h1 className="text-center d-inline">Welcome to DoubtBuddy!.</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="primary" className="mx-4 px-5 py-3" size='lg'>
            Ask a Doubt?
          </Button>
          <Button variant="primary" className=' px-5 py-3' size='lg'>
            Solve a Doubt?
          </Button>
        </Col>
      </Row>
    </Container>
  </>
  )
}

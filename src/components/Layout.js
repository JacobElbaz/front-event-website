import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../images/logo.jpg";

export default function Layout({children}) {
    return (
        <>
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">LM</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/#wedding">The Wedding</Nav.Link>
                    <Nav.Link href="/#answer">Your answer</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/myList">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        {children}
        <div className="copyright">
            <img src={logo} alt="" height={"40px"} width={"40px"} className="rounded"/>
            <span className='small'> © Developed and designed by Jacob Elbaz . 2022</span>
        </div>
        </>
    )
}

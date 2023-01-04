import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazon</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
    </header>
  )
}

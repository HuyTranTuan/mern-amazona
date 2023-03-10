import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from '../Store';
import SearchComponent from './SearchComponent';

export default function Header({isSidebarOpen, setIsSidebarOpen}) {
  const {state, dispatch: ctxDispatch} =  useContext(Store);
  const {cart, userInfo} = state;

  const handelSignOut =() => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container className='header-container'>
            <Button variant="dark" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>Amazon</Navbar.Brand>
            </LinkContainer>
            <div className='cart-toggle-btn-container'>
              <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
              
            </div>
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchComponent></SearchComponent>
              <Nav className='me-auto w-100 justify-content-end'>
                <div className='cart-profile-container'>
                  <div className='cart-profile-container-responsive'>
                    <Link to="/cart" className='nav-link'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg='danger' className='cart-badge'>
                          {cart.cartItems.reduce((a,b) => a+b.quantity,0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.firstName + ' ' + userInfo.lastName} id={"basic-nav-dropdown"}>
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider></NavDropdown.Divider>
                        <Link className='dropdown-item' to='#signout' onClick={handelSignOut}>SignOut</Link>
                      </NavDropdown>
                    ) : (
                      <Link className='nav-link' to='/signin'>Sign In</Link>
                    )}
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

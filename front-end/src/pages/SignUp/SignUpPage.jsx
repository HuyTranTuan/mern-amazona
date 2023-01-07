import React from 'react';
import './SignUpPage.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import {Link, useLocation, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const linkPolicy = <span><Link to={'/policy'} target="_blank">&nbsp;Policy</Link></span>
    const redirect = location.path;
    return (
        <Container className="sign-up-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className='my-3'>Sign Up</h1>
            <Form className='sign-up-form'>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{display: "flex"}}>
                    <Form.Check type="checkbox" label="Agree with our"/>{linkPolicy}
                </Form.Group>
                <div className='mb-3'>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div className='mb-3'>
                    New Customer?{' '}<Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )
}

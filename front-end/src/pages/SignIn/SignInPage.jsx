import React from 'react';
import './SignInPage.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

const SignInPage = () => {
    const param = useLocation();
    const redirectInURL = new URLSearchParams(param.search).get('redirect');
    const redirect = redirectInURL? redirectInURL : '/';
    return (
        <Container className="sign-in-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className='my-3'>Sign In</h1>
            <Form className='sign-in-form'>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Always remember me!" />
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
    );
}

export default SignInPage;

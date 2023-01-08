import React, { useContext, useEffect, useState } from 'react';
import './SignInPage.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import {toast} from 'react-toastify';
import { getErrorMessage } from '../../ulti';

const SignInPage = () => {
    const navigate = useNavigate();
    const param = useLocation();
    const redirectInURL = new URLSearchParams(param.search).get('redirect');
    const redirect = redirectInURL? redirectInURL : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/signin',{
                email,
                password,
            })
            ctxDispatch({type: 'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(function(){
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    return (
        <Container className="sign-in-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className='my-3'>Sign In</h1>
            <Form className='sign-in-form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required onChange={e=> setPassword(e.target.value)}/>
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
                    New Customer?{' '}<Link to={`/signup?redirect=${redirect==="/" ? "/signin" : `/signin?redirect=${redirect}`}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    );
}

export default SignInPage;

import React, { useContext, useEffect, useState } from 'react';
import './SignUpPage.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../ulti';
import PhoneInput, {formatPhoneNumber } from 'react-phone-number-input';

export default function SignUpPage() {
    const navigate = useNavigate();
    const param = useLocation();
    const redirectInURL = new URLSearchParams(param.search).get('redirect');
    const redirect = redirectInURL? redirectInURL : '/';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [agree, setAgree] = useState(false);

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(reenterPassword===password){
                if(agree===true){
                    const {data} = await axios.post('/api/users/signup',{
                        firstName,
                        lastName,
                        email,
                        password,
                        phoneNumber: formatPhoneNumber(phoneNumber),
                        dateOfBirth,
                    }).then(response =>{
                        if(response.status === 201){
                            toast.success(response.data.message);
                        }
                        navigate(redirect || '/signin');
                        return {data: response.data};
                    }).catch(err => {
                        if(err.response.status === 406){
                            toast.error(err.response.data.message);
                        }
                        return {data: err.response.data};
                    });
                } else toast.error("You haven't checked agree with our policy");
            } else toast.error("Wrong reenter password");
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(function(){
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    const linkPolicy = <span><Link to={'/policy'} target="_blank">&nbsp;Policy</Link></span>
    return (
        <Container className="sign-up-container small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className='my-3'>Sign Up</h1>
            <Form className='sign-up-form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        onChange={(e)=> setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        onChange={(e)=> setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                        autoComplete="on"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="reenterPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter Password"
                        onChange={(e)=> setReenterPassword(e.target.value)}
                        autoComplete="on"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                        defaultCountry="VN"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        onChange={(e) => setDateOfBirth(e.target.value.split('-').reverse().join('-'))}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="checkbox" style={{display: "flex"}}>
                    <Form.Check
                        type="checkbox"
                        label="Agree with our"
                        onChange={e => setAgree(e.target.checked)}
                    />{linkPolicy}
                </Form.Group>
                <div className='mb-3'>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div className='mb-3'>
                    Already have an account?{' '}<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </Form>
        </Container>
    )
}

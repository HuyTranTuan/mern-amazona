import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.scss';
import {Store} from '../../Store'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import axios from 'axios';
import {toast} from 'react-toastify';
import { getErrorMessage } from '../../ulti';
import { useReducer } from 'react';
import PhoneInput, {formatPhoneNumber } from 'react-phone-number-input';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default: return state;
    }
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} =state;

    const [firstName, setFirstName] = useState(userInfo.firstName || '');
    const [lastName, setLastName] = useState(userInfo.lastName ||'');
    const [email, setEmail] = useState(userInfo.email || '');
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || '');
    const [dateOfBirth, setDateOfBirth] = useState(userInfo.dateOfBirth || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    })

    useEffect(() => {
        if(!userInfo){
            navigate('/');
        }
    }, [userInfo, navigate]);

    async function handleSubmit(e){
        e.preventDefault();
        if(password === confirmPassword){
            try {
                const {data} = await axios.put(
                    '/api/users/profile',
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                        phoneNumber: formatPhoneNumber(phoneNumber),
                        dateOfBirth,
                    },
                    { 
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    }
                )
                dispatch({type: "UPDATE_SUCCESS"});
                ctxDispatch({type: "USER_SIGNIN", payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
                toast.success('Update successfully');
            } catch (error) {
                dispatch({type: 'UPDATE_FAIL'});
                toast.error(getErrorMessage(error));
            }
        } else {
            toast.error("Confirm password did not match");
        }
    }

    return (
        <div className='container small-container'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h1>Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        value={firstName}
                        type='text'
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        value={lastName}
                        type='text'
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='on'
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete='on'
                    ></Form.Control>
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
                        value={dateOfBirth.split('-').reverse().join('-')}
                        onChange={(e) => setDateOfBirth(e.target.value.split('-').reverse().join('-'))}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Button variant='primary' type='submit'>Update</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

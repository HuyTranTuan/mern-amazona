import React, {useContext, useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import './ShippingPage.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutStepsComponent from '../../components/CheckoutStepsComponent';

export default function ShippingPage() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {
            shippingAddress
        },
        userInfo,
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    useEffect(() => {
        if(!userInfo){
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: "SAVE_SHIPPING ADDRESS",
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            }
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country   
            }
        ));
        navigate('/payment');
        console.log(state);
    }    
    return (
        <>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutStepsComponent step1 step2></CheckoutStepsComponent>
            <div className='small-container m-auto' style={{transform: "translate(0px, 20%)"}}>
                <h1>Shipping Address</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Full name</Form.Label>
                        <Form.Control 
                            value={fullName}
                            onChange={e=> setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            value={address}
                            onChange={e=> setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            value={city}
                            onChange={e=> setCity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control 
                            value={postalCode}
                            onChange={e=> setPostalCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                            value={country}
                            onChange={e=> setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button variant='primary' type='submit'>
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
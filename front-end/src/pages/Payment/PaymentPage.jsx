import React, {useContext, useEffect} from 'react';
import './PaymentPage.scss';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import CheckoutStepsComponent from '../../components/CheckoutStepsComponent';


const PaymentPage = () => {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {
            shippingAddress,
        },
        userInfo,
    } = state;
    useEffect(() => {
        if(!userInfo){
            navigate('/signin?redirect=/payment');
        }
    }, [userInfo, navigate]);
    const handleClick = () => {
        ctxDispatch({
            type: 'PAYMENT',
            payload: {
    
            },
        })
        localStorage.setItem(
            'payment',
            JSON.stringify({
    
            })
        )
        navigate('/');
    }
    return (
        <div>
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <CheckoutStepsComponent step3></CheckoutStepsComponent>
            <div className='mb-3'>
                <Button variant='primary' type='submit' onClick={handleClick}>Submit</Button>
            </div>
        </div>
    );
}

export default PaymentPage;

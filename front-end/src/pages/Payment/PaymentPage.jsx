import React, {useContext, useEffect, useState} from 'react';
import './PaymentPage.scss';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CheckoutStepsComponent from '../../components/CheckoutStepsComponent';


const PaymentPage = () => {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {
            shippingAddress,
            paymentMethod,
        },
    } = state;
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');
    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem( 'paymentMethod', paymentMethodName );
        navigate('/placeorder');
    }
    return (
        <div>
            <CheckoutStepsComponent step1 step2 step3></CheckoutStepsComponent>
            <div className='small-container m-auto'>
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className='my-3'>Payment Method</h1>
                <div className='mb-3'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb3">
                            <Form.Check
                                type='radio'
                                id='PayPal'
                                value='PayPal'
                                checked={paymentMethodName === 'PayPal'}
                                onChange={e=> setPaymentMethod(e.target.value)}
                                label='PayPal'
                            />
                        </Form.Group>
                        <Form.Group className="mb3">
                            <Form.Check
                                type='radio'
                                id='Stripe'
                                value='Stripe'
                                checked={paymentMethodName === 'Stripe'}
                                onChange={e=> setPaymentMethod(e.target.value)}
                                label='Stripe'
                            />
                        </Form.Group>
                        <div className='mb-3 mt-3'>
                            <Button type='submit'>Continue</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;

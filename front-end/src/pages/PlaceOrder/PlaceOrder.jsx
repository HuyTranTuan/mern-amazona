import React, {useContext, useEffect, useReducer, useState} from 'react';
import './PlaceOrder.scss';
import { Store } from '../../Store';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import CheckoutStepsComponent from '../../components/CheckoutStepsComponent';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../ulti';
import axios from 'axios';
import LoadingComponent from '../../components/LoadingComponent';

const reducer = (state, action) =>{
    switch(action.type){
        case 'CREATE_REQUEST':
            return {...state, loading: true};
        case 'CREATE_SUCCESS':
            return {...state, loading: false};
        case 'CREATE_FAIL':
            return {...state, loading: false};
        default: return state;
    }
}

export default function PlaceOrder() {
    const navigate = useNavigate();
    const [{loading}, dispatch] = useReducer(reducer, {
        loading: false,
    })

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {
        userInfo,
        cart: {
            cartItems,
            shippingAddress,
            paymentMethod
        }
    } = state;
    const round2 = (num) => Math.round(num*100+Number.EPSILON)/100;
    const total = round2(cartItems.reduce((total, item)=> total+(item.quantity*item.price), 0));
    const tax = round2(total*0.15);
    const shippingPrice = total>100 ? round2(0) : round2(10);

    useEffect(() =>{
        if(!userInfo){
            navigate('/signin?redirect=/placeorder');
        } 
    },[userInfo, navigate]);

    const handleClickPlaceOrder= async () => {
        if(cartItems.length ===0) toast.error("You have no item in cart");
        if(!shippingAddress.address) toast.error("There is no shipping information");
        if(!paymentMethod) toast.error("You haven't chosen any payment method");
        if(cartItems.length > 0 && shippingAddress.address && paymentMethod){
            try {
                dispatch({type: 'CREATE_REQUEST'});
                const {data} = await axios.post(
                    '/api/orders',
                    {
                        orderItems: cartItems,
                        shippingAddress,
                        paymentMethod,
                        itemsPrice: total,
                        shippingPrice,
                        taxPrice: tax,
                        placeOrderPrice: (tax+ shippingPrice+ total),
                    },
                    {
                        headers: {
                            authorization: `Bearer ${userInfo.token}`,
                        }
                    }
                );
                ctxDispatch({type: 'CART_CLEAR'});
                dispatch({type: 'CREATE_SUCCESS'});
                localStorage.removeItem('cartItems');
                toast.success(data.message);
                navigate(`/order/${data.order._id}`);
            } catch (error) {
                dispatch({type: 'CREATE_FAIL'});
                toast.error(getErrorMessage(error));
            }
        }
    };
        
    return (
        <div>
            <CheckoutStepsComponent step1 step2 step3 step4></CheckoutStepsComponent>
            <div className='m-auto mt-3'>
                <Row>
                    <Helmet>
                        <title>Preview Order</title>
                    </Helmet>
                    <h1>Preview Order</h1>
                </Row>
                <Row>
                    <Col md={8}>
                        <ListGroup className='mb-2'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Name:</b> {shippingAddress.fullName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Address:</b> { shippingAddress.address
                                ? shippingAddress.address+shippingAddress.city+', '+shippingAddress.postalCode+', '+shippingAddress.country
                                : ''
                            }
                            </ListGroup.Item>
                            <ListGroup.Item className='pt-4'>
                                <Button onClick={() => navigate('/shipping')}>Edit</Button>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup className='mb-2'>
                            <ListGroup.Item>
                                <h2>Payment</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Description:</b> {paymentMethod}
                            </ListGroup.Item>
                            <ListGroup.Item className='pt-4'>
                                <Button onClick={() => navigate('/payment')}>Edit</Button>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup className='mb-2'>
                            <ListGroup.Item>
                                <h2>Products</h2>
                            </ListGroup.Item>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.slug} className="d-flex align-items-center">
                                    <Col>
                                        <img src={item.image} alt={item.name} className='img-thumbnail'/>
                                    </Col>
                                    <Col md={6}>
                                        <Link to={`/product/${item.slug}`}>
                                            <Card.Title>{item.name}</Card.Title>
                                        </Link>
                                    </Col>
                                    <Col md={1} className="text-center">{item.quantity}</Col>
                                    <Col md={3} className="text-center">${item.price}</Col>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item className='pt-4'>
                                <Button onClick={() => navigate('/')}>Edit</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card className='mb-2'>
                            <Card.Header>
                                <h2>Order Summary</h2>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={6}>Items</Col>
                                            <Col md={6} className="text-end">${total}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={6}>Shipping:</Col>
                                            <Col md={6} className="text-end">${shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={6}>Tax:</Col>
                                            <Col md={6} className="text-end">${tax}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row >
                                            <Col md={6}><b>Order Total:</b></Col>
                                            <Col md={6} className="text-end"><b>${total + shippingPrice + tax}</b></Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <Button 
                                    className='m-auto w-100'
                                    onClick={handleClickPlaceOrder}
                                >
                                    Place Order
                                </Button>
                                {loading && <LoadingComponent style={{color: 'red'}}></LoadingComponent>}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

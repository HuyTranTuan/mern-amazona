import React, { useContext } from 'react'
import './CartPage.scss';
import {Store} from '../../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link, useNavigate} from 'react-router-dom';
import ErrorComponent from '../../components/ErrorComponent';
import axios from 'axios';

export default function CartPage() {

    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems}
    } = state

    async function handleUpdateCart(item, quantity){
        const {data} = await axios.get(`http://localhost:5000/api/products/${item._id}`);
        if(data.countInStock < quantity){
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity},
        })
    }
    function handleDelete(item) {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }
    const handleCheckOut = async() => {
        navigate('/signin?redirect=/shipping');
    };
    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <ErrorComponent>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </ErrorComponent>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item)=> (
                                <ListGroup.Item key={item._id}>
                                    <Row className='align-items-center'>
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            />{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button
                                                variant='light'
                                                disabled={item.quantity === 1}
                                                onClick={()=>handleUpdateCart(item, item.quantity-1)}
                                            >
                                                <i className='fas fa-minus-circle'></i>
                                            </Button>
                                            {" "}<span>{item.quantity}</span>{' '}
                                            <Button
                                                variant='light'
                                                disabled={item.quantity >= item.countInStock}
                                                onClick={()=>handleUpdateCart(item, item.quantity+1)}
                                            >
                                                <i className='fas fa-plus-circle'></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>{item.price}</Col>
                                        <Col md={2}>
                                            <Button variant='light' onClick={() => handleDelete(item)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((total, item)=> total+item.quantity,0)}&nbsp;items)
                                        <br /> ${cartItems.reduce((total, item)=> total+item.quantity*item.price, 0)} 
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button
                                            type='button'
                                            variant='primary'
                                            disabled={cartItems.length === 0}
                                            onClick={handleCheckOut}
                                        >
                                            Proceed to checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ErrorComponent from '../../components/ErrorComponent.jsx';
import LoadingComponent from '../../components/LoadingComponent.jsx';
import { Store } from '../../Store.js';
import { getErrorMessage } from '../../ulti.js';
import './OrderPage.jsx';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

const reducer = (state, action) =>{
  switch(action.type){
      case 'FETCH_REQUEST':
        return {...state, loading: true, error: ''};
      case 'FETCH_SUCCESS':
        return {...state, loading: false, order: action.payload, error: ''};
      case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload,};
      case 'PAY_REQUEST':
        return {...state, loadingPay: true};
      case 'PAY_SUCCESS':
        return {...state, loadingPay: false, successPay: true,};
      case 'PAY_FAIL':
        return {...state, loadingPay: false,};
      case 'PAY_RESET':
        return {...state, loadingPay: false, successPay: false,};
      default: return state;
  }
}

export default function OrderPage() {
  const navigate = useNavigate();
  const location = window.location.origin;
  const [{loading, error, order, successPay, loadingPay}, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });
  const {state} = useContext(Store)
  const {
    cart,
    userInfo
  } = state;
  const round2 = (num) => Math.round(num*100+Number.EPSILON)/100;
  const params = useParams();
  const {id: orderId} = params;

  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
    .create({
      purchase_units: [
        {
          amount: { value: round2(order.itemsPrice + order.shippingPrice + order.taxPrice) },
        }
      ]
    }).then((orderID) => {
      return orderID;
    });
  }
  function onApprove(data, actions){
    return actions.order.capture().then(async function(details){
      try {
        dispatch({ type: 'PAY_REQUEST'});
        const {data} = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}`},
          }
        );
        dispatch({type: 'PAY_SUCCESS', payload: data});
        toast.success('Order is paid');
      } catch (error) {
        dispatch({type: 'PAY_FAIL', payload: getErrorMessage(error)});
        toast.error(getErrorMessage(error));
      }
    })
  }
  function onError(error){
    toast.error(getErrorMessage(error));
  }

  useEffect(()=>{
    if(!userInfo){
      navigate('/')
    }
    if(!order._id || successPay || (order._id && order._id!==orderId)){
      ;(async function fetchOrder(){
        try {
          dispatch({type: 'FETCH_REQUEST'});
          const {data} = await axios.get(`/api/orders/${orderId}`,{
            headers: {authorization: `Bearer ${userInfo.token}`},
          });
          dispatch({type: 'FETCH_SUCCESS', payload: data});
        } catch (error) {
          dispatch({type: "FETCH_FAIL", payload: getErrorMessage(error)});
        }
      })()
      if(successPay){
        dispatch({type: 'PAY_RESET'});
      }
    } else {
      ;(async function loadPayPalScript(){
        const {data: clientId} = await axios.get('/api/keys/paypal',{
          headers: {authorization: `Bearer ${userInfo.token}`},
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending'});
      })()
    }
  }, [userInfo, navigate, orderId, order, paypalDispatch, successPay]);
  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : error ? (
    <ErrorComponent variant="danger">{error}</ErrorComponent>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <ErrorComponent variant="success">Delivered at {order.deliveredAt}</ErrorComponent>
                ): (
                  <ErrorComponent variant='danger'>Not Delivered</ErrorComponent>
                )}
              </Card.Body>
            </Card>

            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method: </strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <ErrorComponent variant="success">Paid at {order.paidAt}</ErrorComponent>
                ): (
                  <ErrorComponent variant='danger'>Not Paid</ErrorComponent>
                )}
              </Card.Body>
            </Card>

            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                  <ListGroup className='mb-2'>
                    {order.orderItems.map(item => (
                        <ListGroup.Item key={item.slug} className="d-flex align-items-center">
                            <Col>
                                <img src={`${location}/${item.image}`} alt={item.name} className='img-thumbnail'/>
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
                </ListGroup>
              </Card.Body>
            </Card>
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
                            <Col md={6} className="text-end">${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Shipping:</Col>
                            <Col md={6} className="text-end">${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Tax:</Col>
                            <Col md={6} className="text-end">${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row >
                            <Col md={6}><b>Order Total:</b></Col>
                            <Col md={6} className="text-end"><b>${round2(order.placeOrderPrice)}</b></Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        {isPending? (
                          <LoadingComponent/>
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <LoadingComponent/>}
                      </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

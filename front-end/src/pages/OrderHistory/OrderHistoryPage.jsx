import React, { useContext, useEffect, useReducer } from 'react';
import './OrderHistoryPage.scss';
import {Helmet} from 'react-helmet-async';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../ulti';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) =>{
    switch (action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true , error: ''};
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, error: '' , orders: action.payload};
        case 'FETCH_FAIL':
            return { ...state, loading: false , error: action.payload};
        default: return state;
    }
}

export default function OrderHistory() {
    const {state} = useContext(Store);
    const {userInfo} = state;
    const navigate = useNavigate();
    const [{loading, error, orders}, dispatch] = useReducer(reducer,{
        orders: [],
        loading: true,
        error:'',
    });

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        } else {
            ;(async function getData(){
                dispatch({type: 'FETCH_REQUEST'});
                try {
                    const {data} = await axios.get(`/api/orders/mine`,{
                        headers: {authorization: `Bearer ${userInfo.token}`},
                    });
                    dispatch({type: 'FETCH_SUCCESS', payload: data});
                } catch (error) {
                    dispatch({ type: 'FETCH_FAIL', payload: getErrorMessage(error) });
                    toast.error(getErrorMessage(error));
                }
            })()
        }
    }, [userInfo]);

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1>Order History</h1>
            {loading ? (
                <LoadingComponent></LoadingComponent>
            ) : error ? (
                <ErrorComponent variant='danger'>{error}</ErrorComponent>
            ) : (
                <div style={{width: '100%', overflowX: 'scroll'}}>
                    <Table striped hover bordered variant='dark'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=> (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td className='text-end'>${order.placeOrderPrice}</td>
                                    <td className='text-end'>{order.isPaid? order.paidAt.substring(0,10) : 'No'}</td>
                                    <td className='text-center'>{order.isDelivered? order.deliveredAt.substring(0,10) : 'No'}</td>
                                    <td className='text-center'>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={()=>navigate(`/order/${order._id}`)}
                                        >
                                            Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}

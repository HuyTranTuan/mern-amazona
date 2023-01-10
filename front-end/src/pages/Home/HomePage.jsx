import React, { useEffect, useReducer } from 'react';
import "./HomePage.scss"
import ListProductsComponent from '../../components/ListProductsComponent';
import axios from 'axios';
// import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import {getErrorMessage} from '../../ulti';

const reducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

export default function HomeComponent() {
    const [{loading, error, products}, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: "",
    })
    useEffect(() => {
        ;(async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getErrorMessage(error) });
            }
        })()
        return () => {
            
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Amazon</title>
            </Helmet>
            <h1 className='products-title'>List Products</h1>
            <div className="products-container">
                {loading ? (
                    <LoadingComponent/>
                ) : error ? (
                    <ErrorComponent variant="danger">{error}</ErrorComponent>
                ) : (
                    <ListProductsComponent array={products}/>
                )}
            </div>
        </>
    )
}

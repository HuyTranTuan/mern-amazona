import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RatingComponent from './RatingComponent';
import { Store } from '../Store';
import axios from 'axios';

export default function ProductComponent({product_param}) {

    const {state, dispatch: ctxDispatch} =  useContext(Store);
    const {cart} = state;
    async function addToCartHandler(){
        const existItem = cart.cartItems.find(x => x._id === product_param._id);
        const quantity = existItem? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product_param._id}`);
        if(data.countInStock < quantity){
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product_param, quantity},
        })
    }

    return (
        <Card className='col card-product'>
            <Link to={`/product/${product_param.slug}`}>
                <img src={'/'+product_param.image} className="card-img-top" alt={product_param.name}/>
            </Link>

            <Card.Body className='card-product-body'>
                <div style={{display: "flex", justifyContent: "space-between", minHeight: "60px"}}>
                    <Link to={`/product/${product_param.slug}`}>
                        <Card.Title>{product_param.name}</Card.Title>
                    </Link>
                    <strong>${product_param.price}</strong>
                </div>
                <Card.Text className='card-product-description'>{product_param.description}</Card.Text>
                <div className='card-product-rating'>
                    <RatingComponent
                        rating={product_param.rating}
                        numReviews={product_param.numReviews}
                        marginBottom="20px"
                    />
                    { product_param.countInStock!==0 ?
                        <Button onClick={addToCartHandler}>Add to cart</Button>
                        : <Button type='button' variant="light" disabled>Out of Stock</Button>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

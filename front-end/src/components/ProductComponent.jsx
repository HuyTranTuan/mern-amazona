import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RatingComponent from './RatingComponent';

export default function ProductComponent({product}) {
    return (
        <Card className='col'>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name}/>
            </Link>

            <Card.Body>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <strong>${product.price}</strong>
                </div>
                <Card.Text>{product.description}</Card.Text>
                <RatingComponent
                    rating={product.rating}
                    numReviews={product.numReviews}
                    marginBottom="20px"
                />
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

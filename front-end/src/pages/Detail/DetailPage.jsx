import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import "./DetailPage.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import RatingComponent from '../../components/RatingComponent';
import {Helmet} from 'react-helmet-async';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import {getErrorMessage} from '../../ulti';

const reducer = (state, action) =>{
  switch(action.type){
      case 'FETCH_REQUEST':
          return {...state, loading: true};
      case 'FETCH_SUCCESS':
          return {...state, loading: false, product: action.payload};
      case 'FETCH_FAIL':
          return {...state, loading: false, error: action.payload};
      default: 
      return state;
  }
}

export default function DetailComponent() {
  const params = useParams();
  const {slug} = params;
  const [{loading, error, product}, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  })
  
  useEffect(() => {
    ;(async () => {
      dispatch({ type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
      } catch (error) {
            dispatch({ type: 'FETCH_FAIL', payload: getErrorMessage(error) });
        }
    })()
    return () => {
        
    };
  }, [slug]);

  return (
    loading ? (
      <LoadingComponent/>
    ) : error ? (
      <ErrorComponent variant="danger">{error}</ErrorComponent>
    ) : (
      <Row>
        <Col md={8} className='mb-2'>
          <img
            className='img-large'
            src={"/"+product.image}
            alt={product.name}
          />
        </Col>
        <Col md={4}>
          <ListGroup className='mb-2'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingComponent
                rating={product.rating}
                numReviews={product.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
          <Card className='mb-2'>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock>0 ?
                        <Badge bg="success">In Stock</Badge>
                        :
                        <Badge bg="danger">Unavailable</Badge>
                      }
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock>0&&(
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  )
}

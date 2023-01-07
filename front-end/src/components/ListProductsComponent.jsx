import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from './ProductComponent';

export default function ListProductsComponent({array}) {
  return (
    <Row>
        {array.map(e => {
            return (
                <Col
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3 col-container"
                  key={e.slug}
                >
                    <ProductComponent product_param={e}/>
                </Col>
            )
        })}
    </Row>
  )
}

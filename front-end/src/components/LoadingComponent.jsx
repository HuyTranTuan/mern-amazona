import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingComponent({style}) {
  return (
    <Spinner animation="border" role="status" style={style}>
        <span className='visually-hidden'>Loading ...</span>
    </Spinner>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ListProductsComponent({array}) {
  return (
    <>
        {array.map(e => {
            return (
                <div key={e.slug} className="product">
                    <Link to={`/product/${e.slug}`}>
                        <img src={e.image} alt={e.name}/>
                    </Link>
                    <div className="product-info">
                        <div className="product-info-header">
                            <Link to={`/product/${e.slug}`}>
                                <p>{e.name}</p>
                            </Link>
                            <p><strong>${e.price}</strong></p>
                        </div>
                        <div className="product-info-body">
                            <p>{e.description}</p>
                            <button>Add to card</button>
                        </div>
                    </div>
                </div>  
            )
        })}
    </>
  )
}

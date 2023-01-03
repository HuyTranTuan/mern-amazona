import React from 'react';
import data from "../../data";
import ListProductsComponent from '../../components/ListProductsComponent';

export default function HomeComponent() {
    return (
        <main>
            <h1 className='products-title'>List Products</h1>
            <div className="products-container">
                <ListProductsComponent array={data.products}/>
            </div>
        </main>
    )
}

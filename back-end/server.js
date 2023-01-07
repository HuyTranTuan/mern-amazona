import express from 'express';
import cors from 'cors';
import data from "./data.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
    .then(function(){
        console.log('Connected to Mongo');
    })
    .catch(function(){
        console.log('Failed to connect to Mongo');
    });

const app = express();

app.use(cors());

app.get('/api/products', (req, res) => {
    typeof data.products !== 'undefined' && data.products.length === 0
    ? res.status(404).send({ message: 'Products not found' })
    : res.send(data.products) ;
});

app.get('/api/product/slug/:slug', (req, res) => {
    const product = data.products.find(p => p.slug === req.params.slug);
    if (product) return res.send(product);
    else res.status(404).send({ message: 'Product not found' });
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(p => p._id === req.params.id);
    if (product) return res.send(product);
    else res.status(404).send({ message: 'Product not found' });
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
});
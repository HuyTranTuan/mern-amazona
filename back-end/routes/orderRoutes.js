import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) =>{
    const newOrder = new Order({
        orderItems: req.body.orderItems.map(x=> ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        placeOrderPrice: req.body.placeOrderPrice,
        user: req.user._id,
    })
    const order = await newOrder.save();
    res.status(201).send({ order ,message: 'New order created'});
}));

export default orderRouter;
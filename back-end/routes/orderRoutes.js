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

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id});
    if(orders) res.status(200).send(orders);
    else res.status(404).send({message: 'Orders not found'});
}))
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(order) res.status(200).send(order);
    else res.status(404).send({message: 'Order not found'});
}))
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid= true;
        order.paidAt= new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updateOrder = await order.save();
        res.send({message: 'Order Paid', order: updateOrder});
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
}))

export default orderRouter;
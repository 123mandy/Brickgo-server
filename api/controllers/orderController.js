const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const listAllOrders =asyncHandler(async(req,res)=>{
    const orders = await Order.find(); //get all of them
    res.status(200).json(orders)
});

const createOrder =asyncHandler(async(req,res)=>{
    const order = await Order.create(req.body)
    order.save((err, order)=>{
        if(err) res.send(err);
        res.status(200).json(order)
    })
})

const findMyOrder = asyncHandler(async(req,res)=>{
    const orders = await Order.find({"user": req.params.userId}); 
    res.status(200).json(orders)
})

const readOrder =asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.orderId); //get all of them
    res.status(200).json(order)
})

const deleteOrder =asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.orderId);
    if(!order){
        res.status(400)
        throw new Error("Product not found")
    };

    await order.remove();
    res.status(200).json({message:`delete order ${req.params.orderId}`})
})


module.exports = {
    listAllOrders,
    createOrder,
    readOrder,
    findMyOrder,
    deleteOrder
}

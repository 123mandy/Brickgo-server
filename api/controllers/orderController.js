const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const listAllOrders =asyncHandler(async(req,res)=>{
    const orders = await Product.find(); //get all of them
    res.status(200).json(orders)
});

const createOrder =asyncHandler(async(req,res)=>{
    const order = await Product.create(req.body)
    order.save((err, product)=>{
        if(err) res.send(err);
        res.status(200).json(order)
    })
})

const readOrder =asyncHandler(async(req,res)=>{
    const order = await Product.findById(req.params.orderId); //get all of them
    res.status(200).json(order)
})

module.exports = {
    listAllOrders,
    createOrder,
    readOrder
}

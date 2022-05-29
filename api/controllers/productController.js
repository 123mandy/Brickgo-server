const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const User = require('../models/userModel');

// @desc    Get products
// @route   GET /api/products
const listAllProducts =asyncHandler(async(req,res)=>{
    const products = await Product.find(); //get all of them
    res.status(200).json(products)
})

// @desc    Get product by id
// @route   GET /api/products/:id
const readProduct =asyncHandler(async(req,res)=>{
    const products = await Product.findById(req.params.productId); //get all of them
    res.status(200).json(products)
})

// @desc    Create products
// @route   POST /api/products
const createProduct =asyncHandler(async(req,res)=>{
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        qty:req.body.qty,
        user: req.body.user
    })
    product.save((err, product)=>{
        if(err) res.send(err);
        res.status(200).json(product)
    })
    
})

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct =asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.productId)
    if(!product){
        res.status(400)
        throw new Error("Product not found")
    }
    const user = await User.findById(req.user.id)
    // Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the goal user
    if(product.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,
        {
        new: true,
    })
    res.status(200).json(updatedProduct)
})

// @desc    Delete products
// @route   DELETE /api/products/:id
const deleteProduct =asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.productId);
    if(!product){
        res.status(400)
        throw new Error("Product not found")
    };

    await product.remove();
    res.status(200).json({message:`delete product ${req.params.productId}`})
})

module.exports = {
    listAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    readProduct
}

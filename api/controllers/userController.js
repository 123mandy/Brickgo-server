const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');

// @desc Register new user
// @route post /api/users
// @ access Public
const registerUser =asyncHandler (async (req, res)=>{
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    // check if user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exist")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,

    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    }else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})

// @desc Authenticate a user
// @route POST /api/users/login
// @ access Public
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    // Check for user email
    const user= await User.findOne({email})
    if(user && (bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // use this token to define the status
            token: generateJWT(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc Get user data
// @route GET /api/users
// @ access Private
const getMe = asyncHandler(async (req, res)=>{
    const user= await User.findById(req.params.userId)
    res.status(200).json(user)
})

// add product to shopping cart
const updateUser = asyncHandler(async(req,res)=>{
    const updatedUserCart = await User.findByIdAndUpdate(req.params.userId, req.body,
        {
        new: true,
    })
    res.status(200).json(updatedUserCart)
})

// update product in your cart
const updateCart = asyncHandler(async(req, res)=>{
    const cartProduct = await User.updateOne({_id:req.params.userId, 'cart.productId':req.params.productId}, {$set:req.body});
    res.status(200).json(cartProduct)
})

// Delete product in your cart
const deleteCart = asyncHandler(async(req, res)=>{
    const deleteProduct = await User.update({_id:req.params.userId}, {$pull:{'cart':{"productId": req.params.productId}}}, {multi:true});
    res.status(200).json(deleteProduct);
})

//Generate JWT
const generateJWT = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}


module.exports={
    registerUser,
    loginUser, 
    getMe,
    updateUser,
    updateCart,
    deleteCart
}
const express = require('express');
const colors = require("colors");
const cors = require('cors');
const mongoose = require('mongoose');
const {errorHandler} = require("./api/middleware/errorMiddleware");
const connectDB = require("./api/config/db")
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

connectDB();

const port = process.env.PORT || 8080

// connect to database
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create new payment
app.post("/api/payment",cors(), async(req,res)=>{
    let{amount, id} = req.body
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "aud",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    }catch(error){
        console.log("Error", error)
        res.json({
            message: "Payment fail",
            success: false
        })
    }
})

app.use('/api/products', require("./api/routes/productRoute"))
app.use('/api/users', require("./api/routes/userRoute"))
app.use('/api/orders', require("./api/routes/orderRoute"))
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${ port }`);
});

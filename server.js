const express = require('express');
const colors = require("colors");
const cors = require('cors');
const mongoose = require('mongoose');
const {errorHandler} = require("./api/middleware/errorMiddleware");
const connectDB = require("./api/config/db")
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

connectDB();

const port = process.env.PORT || 8080


// connect to database
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/products', require("./api/routes/productRoute"))
 app.use('/api/users', require("./api/routes/userRoute"))
 app.use('/api/orders', require("./api/routes/orderRoute"))
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${ port }`);
});

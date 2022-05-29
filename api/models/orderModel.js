const mongoose = require("mongoose");
const { Schema }= mongoose;

const OrderSchema = new Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        address: {
            type: String, 
            required: "Enter your post address"
        },
        suburb: {
            type: String, 
            required: "Enter your post suburb"
        },
        city: {
            type: String, 
            required: "Enter your post city"
        },
        zip: {
            type: Number, 
            required: "Enter your zip code"
        },
        name: {
            type: String, 
            required: "Enter your name"
        },
        product:{
            type: Array
        },
        totalPrice:{
            type: Number
        },
        phone: {
            type: Number, 
            required: "Enter your phone number"
        }
    },
    {collection: 'order'}
);

module.exports = mongoose.model('Order', OrderSchema);
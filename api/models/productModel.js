const mongoose = require("mongoose");
const { Schema }= mongoose;

const ProductSchema = new Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        name: {
            type: String, 
            required: "Enter the name of your lego set"
        },
        description: {
            type: String, 
            required: "Enter the description of your lego set"
        },
        image: {
            type: Array,
        },
        price: {
            type: Number, 
            required: "Enter the price of your lego set"
        },
        qty: {
            type: Number, 
            required: "Enter the quatity of your lego set"
        }
    },
    {collection: 'product'}
);

module.exports = mongoose.model('Product', ProductSchema);


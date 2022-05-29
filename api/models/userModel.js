const mongoose = require("mongoose");
const { Schema }= mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Please add a email"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address should contain @ and a dot(.)']
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        },
        cart:[
            {
                productId: {type: String},
                productName: {type: String},
                productQty: {type: Number},
                productImage: {type: String},
                qtyNeeded: {type: Number},
                productPrice: {type: Number}
            }
        ]
             
    },
    {collection: 'user'}
);

module.exports = mongoose.model('User', UserSchema);

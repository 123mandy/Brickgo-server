const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        mongoose.Promise = global.Promise;
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongoDB connected : ${conn.connection.host}`.cyan.underline);
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB
const mongoose =require("mongoose");
require('dotenv').config();

const connectDatabase =() =>{
    mongoose.connect(process.env.db_url)
    .then((data) =>{
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) =>{
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    });
};

const getConnection=()=>{
    return mongoose.connection.readyState===1?"Connected":"Not connected"
}

module.exports = {connectDatabase, getConnection};
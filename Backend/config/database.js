// const mongoose = require("mongoose")
// require("dotenv").config();

// async function connectDatabase(){
//     try {
//         await mongoose.connect(process.env.MONGO_URI,{dbName:process.env.MONGODB_NAME});
//         console.log("Database connected successfully to"+process.env.MONGODB_NAME)
//     } catch (error) {
//        console.log("Database connection failed");
//        console.log(error)
//     }
// }
// module.exports = connectDatabase

const {connect} = require("mongoose");

let isConnected;

const connectDatabase = async()=>{
    if(isConnected) return;
    try {
      await connect(process.env.DATABASE_URI).then((data)=>{
        console.log(`Mongodb connected with server:${data.connection.host}`);
    });

    isConnected = true;  
    } catch (error) {
      console.log("Database is not connected")  
    }    
};
module.exports = connectDatabase;

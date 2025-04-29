import mongoose from "mongoose";
import dotenv from "dotenv";
const connectdb=async()=>{
    await mongoose.connect(process.env.Mongo_Uri).then(()=>{
        console.log('Database Connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectdb;

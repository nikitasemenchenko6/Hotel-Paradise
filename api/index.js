import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';

//middlware
const app = express();
dotenv.config();

mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected");
})
const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO);
        console.log("Connected with mongodb")
    }
    catch(error){
        throw error;
    }
}

app.use("/auth", authRoute);


app.listen(8000, () =>{
    connect();
    console.log("connected")
})
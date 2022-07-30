import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//middlware
const app = express();
dotenv.config();

const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO);
        console.log("Connected with mongodb")
    }
    catch(error){
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected");
})


app.listen(8000, () =>{
    connect();
    console.log("connected")
})
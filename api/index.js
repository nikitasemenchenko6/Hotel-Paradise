import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usresRouter from './routes/users.js';
import hotelRouter from './routes/hotel.js';
import roomRouter from './routes/rooms.js';

//middlware
const app = express();
dotenv.config();

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
})
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Connected with mongodb")
    }
    catch (error) {
        throw error;
    }
}

//middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usresRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})
app.listen(8000, () => { connect(); console.log("connected") })
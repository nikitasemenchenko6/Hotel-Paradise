import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usresRouter from './routes/users.js';
import hotelRouter from './routes/hotel.js';
import roomRouter from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bodyParser from 'body-parser';

//middlware
const app = express();
dotenv.config();

const port = 8000
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

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", usresRouter);
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
app.listen(port, () => { connect(); console.log("connected") })
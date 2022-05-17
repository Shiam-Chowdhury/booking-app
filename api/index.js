import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
// const auth = require('./routes/auth');
const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/booking");
        console.log("connected to database");
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "server error!";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8800, () => {
    connect();
    console.log('app is running on port 8800');
})
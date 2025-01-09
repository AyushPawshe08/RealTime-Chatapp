import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from './lib/socket.js';
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' })); // Increase the JSON payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded payloads
//this will allow you to extract json data
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

server.listen(5001,()=>{
    console.log('server running at PORT:',+PORT);
    connectDB()
})
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from './lib/socket.js';
import path from "path"
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(express.json({ limit: '10mb' })); // Increase the JSON payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded payloads
//this will allow you to extract json data
app.use(cookieParser());
app.use(cors({
    origin: "https://social-chain-orcin.vercel.app",
    credentials:true
}))
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener App!');
});

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    });
}


server.listen(5001,()=>{
    console.log('server running at PORT:',+PORT);
    connectDB()
})

import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());//this will allow you to extract json data
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

app.listen(5001,()=>{
    console.log('server running at PORT:',+PORT);
    connectDB()
})
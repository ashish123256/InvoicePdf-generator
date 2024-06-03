import express, { NextFunction, Request, Response } from 'express'; // Import Request and Response types from express
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import authRoutes from  './routes/authRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import path from "path";


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB as string)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });


   

const app = express();
const port:number= parseInt((process.env.PORT || '5000') as string, 10);

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())



app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*',(req:Request, res:Response)=>{
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
})

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(port,()=>{
    console.log("Server is running on port 5000");
})

export default app;

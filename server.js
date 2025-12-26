import express from 'express';
import connectDB from './config/connectDB.js';
import userRouter from './Routers/userRoute.js';
import { fetchJobService } from './Service/fetchJobService.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        app.use('/api/users', userRouter);
        fetchJobService();
    } catch (error) {
        console.error("Error starting server:", error);
        }
    };

startServer();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/dbConfig.js";
import userRoute from "./Routes/userRoute.js";
import "./Bot/bot.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/api/user", userRoute);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => 
      console.log(`Server running on http://localhost:${PORT}`)
    );

  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

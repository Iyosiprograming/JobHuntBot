import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/dbConfig.js"
import userRoute from "./Routes/userRoute.js"

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use("/api/user", userRoute)

const startServer = async () =>{
    try {
        await connectDB()
        app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`))
    } catch (error) {
        console.log("Error starting server:", error)
    }
}

startServer()
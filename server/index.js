import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import expensesRoute from "./routes/expenses.route.js"
import { protect } from "./middleware/auth.js";
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT;

connectDB()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/expenses",protect,expensesRoute)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
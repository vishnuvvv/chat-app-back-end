import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
dotenv.config();
mongoose.set('strictQuery', false)

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL

app.use("/api/user",userRouter)


mongoose.connect(MONGODB_URL).then(()=>{
  app.listen(PORT)
}).then(()=>{
  console.log(`Connected to database and listening to ${PORT}`);
}).catch((err)=>{
  console.log(err);
})



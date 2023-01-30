import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(()=>{
  app.listen(PORT)
}).then(()=>{
  console.log(`Connected to database and listening to ${PORT}`);
}).catch((err)=>{
  console.log(err);
})



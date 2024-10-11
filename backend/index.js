// const express= require("express");
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import Router from "./routes/userRoute.js"
import cors from 'cors';
// import User from "./models/userModel.js"
                                                                
const app=express();

dotenv.config({
    path:".env"       
}) 

databaseConnection();

// MiddleWare
app.use(cors())
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000' ,
    credentials: true,// React frontend origin
  }));

// API
app.use("/api/v1/user",Router);

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
});
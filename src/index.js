//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import connectDb from './db/connection.js';
import { app } from './app.js';

dotenv.config({ path: './env' });

connectDb()
.then(()=>{
    app.listen(process.env.PORT ||8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});




































































































































































































/*

import express from "express";

const app = express();

(async ()=>{
try{
await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
app.on("error",(error)=>{
    console.log("MongoDB connection error:", error);
    throw error;
})
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
}catch(error){
console.error("Error connecting to MongoDB:", error);
throw error;
}
})()

*/
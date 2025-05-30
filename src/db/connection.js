import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { app } from "../app.js";

const connectDb = async() => {
try{
const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host} \n`);
app.on("error", (error) => {    
console.log("MongoDB connection error:", error);
});
}catch(error){
console.error("Error connecting to MongoDB:", error);
process.exit(1);
}
}



export default connectDb;
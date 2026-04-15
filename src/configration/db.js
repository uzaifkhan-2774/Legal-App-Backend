import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;


export default async()=>{

   try {
    
    const connection = await mongoose.connect(mongoUrl);
    console.log("mongodb connected successfully..");

   } catch (error) {
    console.log("connection failed");
   }
}
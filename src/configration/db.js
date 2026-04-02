import mongoose from "mongoose";

export default async()=>{

   try {
    
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/legalapp");
    console.log("mongodb connected successfully..");

   } catch (error) {
    console.log("connection failed");
   }
}
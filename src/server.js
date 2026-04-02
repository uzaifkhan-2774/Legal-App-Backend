import app from "./app.js";
import mongoDB from "./configration/db.js";


mongoDB();


app.listen(7000, ()=>{
    console.log("Server is running..");
});
import app from "./app.js";
import mongoDB from "./configration/db.js";
const port = process.env.PORT;

//database call.
mongoDB();

//connecting to the server http://127.0.0.1:7000
app.listen(port, ()=>{
    console.log("Server is running..");
});
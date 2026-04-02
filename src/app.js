import express from "express";
import authRounter from "./routes/authRouter.js";
import adminRouther from "./routes/adminRouter.js";
import lawyerRouter from "./routes/lawyerRouter.js";
import clientRouter from "./routes/clientRouter.js";

const app = express();


// built-in middleware.
app.use(express.json());


// mounting the routers.

app.use("/auth",authRounter );
app.use("/admin", adminRouther);
app.use("/lawyer", lawyerRouter );
app.use("/client", clientRouter );



// http://127.0.0.1:7000   => base URl
// http://127.0.0.1:7000/auth/registration  => url for registraion of user 

export default app;
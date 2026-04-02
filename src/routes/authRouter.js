import express from "express";
import { registration, login } from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// first api for registration of users.


router.post("/registraion", registration)

// Api for login .

router.post("/login", login);



export default router;
import express from "express";
import { createLawyerProfile } from "../controller/lawyerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/createLawyerProfile",  createLawyerProfile);


export default router;
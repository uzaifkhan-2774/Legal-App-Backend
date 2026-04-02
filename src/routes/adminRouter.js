import express from "express";
import  {getallLawyer, UpdateLawyerStatus} from "../controller/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/getallLawyer", authMiddleware, getallLawyer );
router.put("/updatelawyerstatus/:id" , authMiddleware,  UpdateLawyerStatus);


export default router;
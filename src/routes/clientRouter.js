import express from "express";
import {AiResponse, CaseCreate} from "../controller/clientAiController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";



const Router = express.Router()

Router.post("/GetAiResponse", authMiddleware, AiResponse);
Router.post("/CreateCase", authMiddleware, upload.array('proofFile', 2), CaseCreate);  // setting the router for creating the case and then passing the request through the multer middleware

export default Router;
import express from "express";
import {AiResponse, CaseCreate} from "../controller/clientAiController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const Router = express.Router()

Router.post("/GetAiResponse", authMiddleware, AiResponse);
Router.post("/CreateCase", authMiddleware, CaseCreate);

export default Router;
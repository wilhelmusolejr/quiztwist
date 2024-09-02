import express from "express";
import { getListQuestions } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/getListQuestions", getListQuestions);

export default router;

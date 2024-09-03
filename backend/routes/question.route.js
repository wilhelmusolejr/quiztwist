import express from "express";
import { getListQuestions, test } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/getListQuestions", getListQuestions);
router.post("/test", test);

export default router;

import express from "express";
import {
  getListQuestions,
  questionJson,
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/getListQuestions", questionJson);

export default router;

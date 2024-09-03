import express from "express";
import {
  getListQuestions,
  questionJson,
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/getListQuestions", getListQuestions);
router.post("/test", questionJson);

export default router;

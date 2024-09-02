import express from "express";
import { addPoints } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/add-points", addPoints);

export default router;

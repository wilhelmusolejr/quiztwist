import express from "express";
import {
  login,
  signup,
  getUpdatedUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUpdatedUser", getUpdatedUser);

export default router;

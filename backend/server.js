import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import questionRoutes from "./routes/question.route.js";
import quizRoutes from "./routes/quiz.route.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";

import { Question } from "./models/question.model.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Use CORS middleware before defining routes
app.use(
  cors({
    origin: "https://quiztwist-frontend.vercel.app", // Allow only this origin
  })
);
app.use(express.json()); // Allows us to parse JSON data in the body of the request

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/question", async (req, res) => {
  const { number_question, category } = req.body;

  try {
    const allQuestions = await Question.find({ category });
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(
      0,
      parseInt(number_question)
    );
    return res
      .status(200)
      .json({ success: true, questions: selectedQuestions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ROUTE
app.use("/api/auth", authRoutes);

// QUESTION
// app.use("/api/question", questionRoutes);

// QUIZ
app.use("/api/quiz", quizRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});

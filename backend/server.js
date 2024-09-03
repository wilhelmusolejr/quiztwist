import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import questionRoutes from "./routes/question.route.js";
import quizRoutes from "./routes/quiz.route.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "https://quiztwist-frontend.vercel.app", // Allow only this origin
  })
);

// express
app.use(express.json()); // Allows us to parse JSON data in the body of the request

// ROUTE
app.use("/api/auth", authRoutes);

// QUESTION
app.use("/api/question", questionRoutes);

// QUIZ
app.use("/api/quiz", quizRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});

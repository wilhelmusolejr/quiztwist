import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Question = mongoose.model("Questions", questionSchema);

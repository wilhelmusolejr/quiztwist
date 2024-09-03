import { Question } from "../models/question.model.js";
import allQuestions from "../data/questions.json" assert { type: "json" };

export const getListQuestions = async (req, res) => {
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
};

export const questionJson = async (req, res) => {
  const { number_question, category } = req.body;

  try {
    const filteredQuestion = allQuestions.filter((question) => {
      return question.category === category;
    });

    const shuffledQuestions = filteredQuestion.sort(() => 0.5 - Math.random());
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
};

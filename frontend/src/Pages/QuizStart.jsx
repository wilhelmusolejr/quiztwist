// components
import { useContext, useEffect, useReducer } from "react";

import {
  faBook,
  faFlask,
  faMap,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

import Navigator from "../Components/Navigator";
import QuizFinish from "../Components/QuizFinish";
import QuizProgress from "../Components/QuizProgress";
import QuizReady from "../Components/QuizReady";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

let num_questions = 15;
let icon;
let initialState = {
  questions: [],
  currentQuestionIndex: 0,
  points: 0,
  total_points: 0,
  answer: null,
  correct_answers: 0,
  time_limit: 50,

  // loading, ready, onprogress, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        total_points: action.payload.reduce((acc, question) => {
          return acc + question.points;
        }, 0),
        time_limit: action.payload.length * 10,
      };

    case "START_QUIZ":
      return { ...state, status: "progress" };

    case "ANSWER_QUESTION":
      return {
        ...state,
        answer: action.payload.user_answer,
        points:
          action.payload.user_answer ===
          state.questions[state.currentQuestionIndex].answer
            ? state.points + state.questions[state.currentQuestionIndex].points
            : state.points,
        correct_answers:
          action.payload.user_answer ===
          state.questions[state.currentQuestionIndex].answer
            ? state.correct_answers + 1
            : state.correct_answers,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        answer: null,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case "FINISH_QUIZ":
      return {
        ...state,
        status: "finished",
      };

    default:
      throw new Error("Unknown action type");
  }
}

function capitalizeFirstLetter(string) {
  if (!string) return ""; // if string is empty
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function Home() {
  const { user, updatePoints } = useContext(AuthContext);

  const location = useLocation();
  const capitalizedCategory = capitalizeFirstLetter(
    location.pathname.split("/")[2]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  let { status, questions, currentQuestionIndex, time_limit } = state;

  let quizInfo = {
    num_questions: questions.length,
    current_index: currentQuestionIndex,
    current_points: state.points,
    total_points: state.total_points,
    correct_answers: state.correct_answers,
  };

  let user_answer = state.answer;

  // fetch questions from the database
  useEffect(() => {
    const questionData = {
      number_question: num_questions,
      category: capitalizedCategory,
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/question/getListQuestions",
          questionData
        );

        dispatch({ type: "SET_QUESTIONS", payload: response.data.questions });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // set title and icon
  useEffect(() => {
    switch (capitalizedCategory) {
      case "General":
        document.title = "General Quiz";
        icon = faFlask;
        break;
      case "English":
        document.title = "English Quiz";
        icon = faBook;
        break;
      case "Science":
        document.title = "Science Quiz";
        icon = faRocket;
        break;
      case "Country":
        document.title = "Country Quiz";
        icon = faMap;
        break;
    }
  }, [capitalizedCategory]);

  // if quiz is finish, push points to the database
  useEffect(() => {
    if (state.status === "finished") {
      const addPoints = async () => {
        const quizResult = {
          user: user._id,
          points: state.points,
          type: capitalizedCategory,
        };

        try {
          const response = await axios.post(
            "http://localhost:3000/api/quiz/add-points",
            quizResult
          );

          console.log(response.data.quiz.points);

          updatePoints(response.data.quiz.points);
        } catch (error) {
          console.log(error);
        }
      };

      if (user) {
        addPoints();
      }
    }
  }, [state.status]);

  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        {status === "ready" && (
          <QuizReady
            dispatch={dispatch}
            icon={icon}
            quiz_title={capitalizedCategory}
            number_question={num_questions}
          />
        )}

        {/* Quiz */}
        {status === "progress" && (
          <QuizProgress
            quizInfo={quizInfo}
            question={questions[currentQuestionIndex]}
            dispatch={dispatch}
            user_answer={user_answer}
            time_limit={time_limit}
          />
        )}

        {/* finish */}
        {status === "finished" && <QuizFinish quizInfo={quizInfo} />}
      </header>
    </>
  );
}

export default Home;

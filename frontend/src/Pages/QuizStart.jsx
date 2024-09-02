// Import necessary libraries
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useReducer } from "react";

// Import necessary icons
import {
  faBook,
  faFlask,
  faMap,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

// Import components
import Navigator from "../Components/Navigator";
import QuizFinish from "../Components/QuizFinish";
import QuizProgress from "../Components/QuizProgress";
import QuizReady from "../Components/QuizReady";

const BACKEND_URL = `http://localhost:3000/api`;

// variables
const num_questions = 15;

const SET_QUESTIONS = "SET_QUESTIONS";
const START_QUIZ = "START_QUIZ";
const ANSWER_QUESTION = "ANSWER_QUESTION";
const NEXT_QUESTION = "NEXT_QUESTION";
const FINISH_QUIZ = "FINISH_QUIZ";

const PROGRESS_READY = "ready";
const PROGRESS_PROGRESS = "progress";
const PROGRESS_FINISHED = "finished";

const time_limit_per_question = 10;

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
  const { type, payload } = action;

  switch (type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: payload,
        status: PROGRESS_READY,
        total_points: payload.reduce((acc, question) => {
          return acc + question.points;
        }, 0),
        time_limit: payload.length * time_limit_per_question,
      };

    case START_QUIZ:
      return { ...state, status: PROGRESS_PROGRESS };

    case ANSWER_QUESTION:
      return {
        ...state,
        answer: payload.user_answer,
        points:
          payload.user_answer ===
          state.questions[state.currentQuestionIndex].answer
            ? state.points + state.questions[state.currentQuestionIndex].points
            : state.points,
        correct_answers:
          payload.user_answer ===
          state.questions[state.currentQuestionIndex].answer
            ? state.correct_answers + 1
            : state.correct_answers,
      };

    case NEXT_QUESTION:
      return {
        ...state,
        answer: null,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case FINISH_QUIZ:
      return {
        ...state,
        status: PROGRESS_FINISHED,
      };

    default:
      throw new Error(`Unknown action type: ${type}`);
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
    const controller = new AbortController();

    const questionData = {
      number_question: num_questions,
      category: capitalizedCategory,
    };

    const fetchData = async () => {
      try {
        const {
          data: { questions },
        } = await axios.post(
          `${BACKEND_URL}/question/getListQuestions`,
          questionData
        );

        dispatch({ type: SET_QUESTIONS, payload: questions });
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchData();

    return () => controller.abort();
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
    if (state.status === PROGRESS_FINISHED) {
      const addPoints = async () => {
        const quizResult = {
          user: user._id,
          points: state.points,
          type: capitalizedCategory,
        };

        try {
          const response = await axios.post(
            `${BACKEND_URL}/quiz/add-points`,
            quizResult
          );
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

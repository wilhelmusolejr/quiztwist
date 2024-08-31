// components
import { useEffect, useReducer } from "react";

import Navigator from "./Components/Navigator";
import QuizFinish from "./Components/QuizFinish";
import QuizProgress from "./Components/QuizProgress";
import QuizStart from "./Components/QuizStart";

let initialState = {
  questions: [],
  points: 0,
  currentQuestionIndex: 0,
  answer: null,
  correct_answers: 0,

  // loading, ready, onprogress, finished
  status: "loading",

  total_points: 0,
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
      };

    case "START_QUIZ":
      return { ...state, status: "progress" };

    case "ANSWER_QUESTION":
      return {
        ...state,
        answer: action.payload.user_answer,
        points:
          action.payload.user_answer ===
          state.questions[state.currentQuestionIndex].correctAnswer
            ? state.points + state.questions[state.currentQuestionIndex].points
            : state.points,
        correct_answers:
          action.payload.user_answer ===
          state.questions[state.currentQuestionIndex].correctAnswer
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let { status, questions, currentQuestionIndex } = state;

  let quizInfo = {
    num_questions: questions.length,
    current_index: currentQuestionIndex,
    current_points: state.points,
    total_points: state.total_points,
    correct_answers: state.correct_answers,
  };

  let user_answer = state.answer;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        dispatch({ type: "SET_QUESTIONS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        {status === "ready" && <QuizStart dispatch={dispatch} />}

        {/* Quiz */}
        {status === "progress" && (
          <QuizProgress
            quizInfo={quizInfo}
            question={questions[currentQuestionIndex]}
            dispatch={dispatch}
            user_answer={user_answer}
          />
        )}

        {/* finish */}
        {status === "finished" && <QuizFinish quizInfo={quizInfo} />}
      </header>
    </>
  );
}

export default App;

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
  status: "loading", // loading, ready, progress, finished
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

    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        {status != "progress" && <QuizStart />}

        {/* Quiz */}
        {status === "progress" && <QuizProgress />}

        {/* finish */}
        <QuizFinish />
      </header>
    </>
  );
}

export default App;

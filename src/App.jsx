// components
import { useEffect, useReducer, useState } from "react";

import Navigator from "./Components/Navigator";
import QuizFinish from "./Components/QuizFinish";
import QuizProgress from "./Components/QuizProgress";
import QuizStart from "./Components/QuizStart";

let initialState = {
  questions: [],
  points: 0,
  currentQuestionIndex: 0,
  status: "loading", // loading, ready, progress, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [{ questions }, dispatch] = useReducer(reducer, initialState);

  // const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        // setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(questions);

  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        <QuizStart />

        {/* Quiz */}
        <QuizProgress />

        {/* finish */}
        <QuizFinish />
      </header>
    </>
  );
}

export default App;

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import styles from "./QuizFooter.module.css";

function QuizFooter({ dispatch, quizInfo, user_answer, time_limit }) {
  const [timeLeft, setTimeLeft] = useState(time_limit);

  const hasAnswered = user_answer != null;
  const counterRef = useRef(null);

  useEffect(() => {
    if (quizInfo.current_index + 1 != quizInfo.num_questions && hasAnswered) {
      if (counterRef.current) {
        counterRef.current.textContent = 5;
      }

      // Start countdown
      let timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
      }, 5000);

      let interval = setInterval(() => {
        if (counterRef.current) {
          let currentCount = parseInt(counterRef.current.textContent);
          counterRef.current.textContent = currentCount - 1;
        }
      }, 1000);

      // Cleanup both timeout and interval on unmount or when dependencies change
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [dispatch, quizInfo, hasAnswered]);

  useEffect(() => {
    // Timer countdown for the whole quiz time limit
    let timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // If time runs out, finish the quiz
    if (timeLeft <= 0) {
      dispatch({ type: "FINISH_QUIZ" });
      return;
    }

    // Clean up the timer interval when the component unmounts or when timeLeft reaches 0
    return () => clearInterval(timerInterval);
  }, [timeLeft, dispatch]);

  // Format timeLeft as hh:mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={`d-flex justify-content-between align-items-center`}>
      <div className="quiz-time">
        <span>Time Left: {formatTime(timeLeft)}</span>
      </div>

      {hasAnswered && (
        <p className={`${styles.timer}`}>
          Auto next in{" "}
          <span className="counter" ref={counterRef}>
            5
          </span>{" "}
          seconds
        </p>
      )}

      <button
        className={`btn btn-primary ${styles.button}`}
        onClick={() => {
          dispatch({
            type:
              quizInfo.current_index + 1 !== quizInfo.num_questions
                ? "NEXT_QUESTION"
                : "FINISH_QUIZ",
          });
        }}
      >
        {quizInfo.current_index + 1 !== quizInfo.num_questions
          ? "Next"
          : "Finish"}
      </button>
    </div>
  );
}

QuizFooter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quizInfo: PropTypes.object.isRequired,
  user_answer: PropTypes.number,
  time_limit: PropTypes.number.isRequired,
};

export default QuizFooter;

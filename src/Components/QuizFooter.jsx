import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function QuizFooter({ dispatch, quizInfo, user_answer }) {
  const hasAnswered = user_answer != null;
  const counterRef = useRef(null);

  console.log(hasAnswered);

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

  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div className="quiz-time">
        <span>Time Left: 00:00:00</span>
      </div>

      {hasAnswered && (
        <p>
          Auto next in{" "}
          <span className="counter" ref={counterRef}>
            5
          </span>{" "}
          seconds
        </p>
      )}

      <button
        className="btn btn-primary"
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
};

export default QuizFooter;

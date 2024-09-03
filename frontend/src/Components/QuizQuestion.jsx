import PropTypes from "prop-types";

import styles from "./QuizQuestion.module.css";

function QuizQuestion({ question, dispatch, user_answer }) {
  let hasAnswered = user_answer != null;

  function handleOptionClick(index) {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        user_answer: index,
      },
    });
  }

  return (
    <>
      <div className="quiz text-center py-5">
        {/* question */}
        <h2 className={`${styles["question-name"]} text-light`}>
          {question.question}
        </h2>

        {/* options */}
        <div
          className="quiz-option text-light d-flex
        flex-column align-items-center"
        >
          {question.options.map((option, index) => {
            // Determine the class based on whether the answer is correct, incorrect, or unanswered
            let btnClass = "btn btn-option mt-3";

            if (hasAnswered) {
              if (index === user_answer) {
                btnClass +=
                  index === question.answer ? " btn-correct" : " btn-incorrect";
              } else if (index === question.answer) {
                btnClass += " btn-correct";
              }
            }
            return (
              <button
                key={index}
                className={`${btnClass} ${hasAnswered ? "disabled" : ""}`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

QuizQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user_answer: PropTypes.number,
};

export default QuizQuestion;

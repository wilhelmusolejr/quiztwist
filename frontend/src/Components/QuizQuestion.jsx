import PropTypes from "prop-types";

function QuizQuestion({ question, dispatch, user_answer }) {
  let hasAnswered = user_answer != null;

  return (
    <>
      <div className="quiz text-center py-5">
        {/* question */}
        <h2 className="text-light">{question.question}</h2>

        {/* options */}
        <div
          className="quiz-option text-light d-flex
        flex-column align-items-center"
        >
          {question.answers.map((option, index) => {
            // Determine the class based on whether the answer is correct, incorrect, or unanswered
            let btnClass = "btn btn-option mt-3";

            if (hasAnswered) {
              if (index === user_answer) {
                btnClass +=
                  index === question.correctAnswer
                    ? " btn-correct"
                    : " btn-incorrect";
              } else if (index === question.correctAnswer) {
                btnClass += " btn-correct";
              }
            }

            return (
              <button
                key={index}
                className={`${btnClass} ${hasAnswered ? "disabled" : ""}`}
                onClick={() => {
                  dispatch({
                    type: "ANSWER_QUESTION",
                    payload: {
                      user_answer: index,
                    },
                  });
                }}
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

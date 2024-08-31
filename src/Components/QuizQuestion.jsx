import PropTypes from "prop-types";

function QuizQuestion({ question, dispatch, user_answer }) {
  let hasAnswered = user_answer != null;

  return (
    <>
      <div className="quiz text-center py-5">
        {/* question */}
        <h2 className="text-light">{question.question}</h2>

        {/* options */}
        <div className="quiz-option text-light">
          {question.answers.map((option, index) => (
            <button
              key={index}
              className={`btn btn-option mt-3 ${
                hasAnswered ? "disabled" : ""
              } `}
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
          ))}
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

import PropTypes from "prop-types";

function QuizFooter({ dispatch, quizInfo }) {
  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div className="quiz-time">
        <span>Time Left: 00:00:00</span>
      </div>

      {quizInfo.current_index + 1 != quizInfo.num_questions ? (
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "NEXT_QUESTION" });
          }}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "FINISH_QUIZ" });
          }}
        >
          Finish
        </button>
      )}
    </div>
  );
}

QuizFooter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quizInfo: PropTypes.object.isRequired,
};

export default QuizFooter;

import PropTypes from "prop-types";

function QuizFooter({}) {
  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div className="quiz-time">
        <span>Time Left: 00:00:00</span>
      </div>
      <button className="btn btn-primary" onClick={() => {}}>
        Next
      </button>
    </div>
  );
}

QuizFooter.propTypes = {
  dispatch: PropTypes.func.isRequired, // Ensure dispatch is a function and required
};

export default QuizFooter;

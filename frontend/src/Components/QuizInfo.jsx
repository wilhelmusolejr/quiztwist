import PropTypes from "prop-types";

import styles from "./QuizInfo.module.css";

function QuizInfo({ quizInfo }) {
  return (
    <>
      <div className="quiz-info">
        {/* progress */}
        <progress
          value={quizInfo.current_index + 1}
          max={quizInfo.num_questions}
          className={`${styles["progress-bar"]}`}
        ></progress>
        {/* info */}
        <div className="d-flex justify-content-between mt-2">
          <div className="">
            <span>
              Question {quizInfo.current_index + 1} / {quizInfo.num_questions}
            </span>
          </div>
          <div className="">
            <span>
              {quizInfo.current_points} / {quizInfo.total_points} points
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

QuizInfo.propTypes = {
  quizInfo: PropTypes.object.isRequired,
};

export default QuizInfo;

import PropTypes from "prop-types";

import styles from "./QuizInfo.module.css";

function QuizInfo({}) {
  return (
    <>
      <div className="quiz-info">
        {/* progress */}
        <progress
          value={index}
          max={numberOfQuestions}
          className={`${styles["progress-bar"]}`}
        ></progress>
        {/* info */}
        <div className="d-flex justify-content-between mt-2">
          <div className="">
            <span>
              Question {index} / {numberOfQuestions}
            </span>
          </div>
          <div className="">
            <span>
              {points} / {total_points} points
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

QuizInfo.propTypes = {};

export default QuizInfo;

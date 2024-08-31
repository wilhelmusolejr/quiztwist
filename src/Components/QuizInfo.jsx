import styles from "./QuizInfo.module.css";

function QuizInfo() {
  return (
    <>
      <div className="quiz-info">
        {/* progress */}
        <progress
          value="90"
          max="100"
          className={`${styles["progress-bar"]}`}
        ></progress>
        {/* info */}
        <div className="d-flex justify-content-between mt-2">
          <div className="">
            <span>Question 1/15</span>
          </div>
          <div className="">
            <span>0 / 280 points</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizInfo;

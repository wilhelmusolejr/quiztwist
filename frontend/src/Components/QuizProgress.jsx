import PropTypes from "prop-types";

import QuizFooter from "./QuizFooter";
import QuizInfo from "./QuizInfo";
import QuizQuestion from "./QuizQuestion";
import Section from "./Section";

import styles from "./QuizProgress.module.css";
import { useEffect } from "react";

function QuizProgress({
  quizInfo,
  question,
  dispatch,
  user_answer,
  time_limit,
}) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Modern browsers show a generic message, this line is needed for it to work
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Section className="question-parent">
      <div className={`container ${styles["question-container"]} p-3 rounded`}>
        {/* info */}
        <QuizInfo quizInfo={quizInfo} />

        {/* question */}
        <QuizQuestion
          question={question}
          dispatch={dispatch}
          user_answer={user_answer}
        />

        {/* footer */}
        <QuizFooter
          dispatch={dispatch}
          quizInfo={quizInfo}
          user_answer={user_answer}
          time_limit={time_limit}
        />
      </div>
    </Section>
  );
}

QuizProgress.propTypes = {
  quizInfo: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user_answer: PropTypes.number,
  time_limit: PropTypes.number.isRequired,
};

export default QuizProgress;

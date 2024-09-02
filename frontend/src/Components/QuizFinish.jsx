import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSackDollar } from "@fortawesome/free-solid-svg-icons";

import Section from "./Section";
import styles from "./QuizFinish.module.css";

function QuizFinish({ quizInfo }) {
  const percentage = (
    (quizInfo.correct_answers / quizInfo.num_questions) *
    100
  ).toFixed();

  return (
    <Section className={`${styles["finish-parent"]} position-center`}>
      <div className="text-center">
        <h2>Thanks for taking the quiz!</h2>
        <h3 className="my-3">Well done!</h3>
      </div>
      <div className=" mt-5">
        <div className="d-flex align-items-center gap-3 p-2 ">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`${styles["check-parent"]}`}
          />

          <p>
            {quizInfo.correct_answers} out of {quizInfo.num_questions} questions
            passed! ({percentage}%)
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 p-2 ">
          <FontAwesomeIcon icon={faSackDollar} className={`icon-coin`} />
          <p>{quizInfo.current_points} points earned!</p>
        </div>
      </div>
    </Section>
  );
}

QuizFinish.propTypes = {
  quizInfo: PropTypes.object.isRequired,
};

export default QuizFinish;

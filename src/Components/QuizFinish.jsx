import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSackDollar } from "@fortawesome/free-solid-svg-icons";

import Section from "./Section";
import styles from "./QuizFinish.module.css";

function QuizFinish() {
  return (
    <Section className={`${styles["finish-parent"]} position-center d-none`}>
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

          <p>5 out of 10 questons passed!</p>
        </div>
        <div className="d-flex align-items-center gap-3 p-2 ">
          <FontAwesomeIcon
            icon={faSackDollar}
            className={`${styles["points-parent"]}`}
          />
          <p>280 points earned!</p>
        </div>
      </div>
    </Section>
  );
}

export default QuizFinish;

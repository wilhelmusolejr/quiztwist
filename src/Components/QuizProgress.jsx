import QuizFooter from "./QuizFooter";
import QuizInfo from "./QuizInfo";
import QuizQuestion from "./QuizQuestion";
import Section from "./Section";

import styles from "./QuizProgress.module.css";

function QuizProgress() {
  return (
    <Section className="question-parent my-4 d-none">
      <div className={`container ${styles["question-container"]} p-3 rounded`}>
        {/* info */}
        <QuizInfo />

        {/* question */}
        <QuizQuestion />

        {/* footer */}
        <QuizFooter />
      </div>
    </Section>
  );
}

export default QuizProgress;

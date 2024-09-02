import PropTypes from "prop-types";
import Section from "./Section";
import CategoryContainer from "./CategoryContainer";
import { faFlask } from "@fortawesome/free-solid-svg-icons";

function QuizReady({ dispatch }) {
  return (
    <Section className="text-center position-center">
      <div className="d-flex align-items-center justify-content-center mb-5">
        <CategoryContainer icon={faFlask} title="General" />
      </div>

      <h2>15 questions to test your React Mastery!</h2>

      <button
        className="btn btn-primary mt-4"
        onClick={() => dispatch({ type: "START_QUIZ" })}
      >
        {"Let's start"}
      </button>
    </Section>
  );
}

// Define PropTypes for the component
QuizReady.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default QuizReady;

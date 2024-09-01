import PropTypes from "prop-types";
import Section from "./Section";

function QuizStart({ dispatch }) {
  return (
    <Section className="text-center position-center">
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
QuizStart.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default QuizStart;

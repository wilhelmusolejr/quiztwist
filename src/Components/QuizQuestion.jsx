import PropTypes from "prop-types";

function QuizQuestion({}) {
  return (
    <>
      <div className="quiz text-center py-5">
        {/* question */}
        <h2 className="text-light">{question.question}</h2>

        {/* options */}
        <div className="quiz-option text-light">
          {question.answers.map((option, index) => (
            <button
              key={index}
              className={`btn btn-option mt-3`}
              onClick={() => {}}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

QuizQuestion.propTypes = {};

export default QuizQuestion;

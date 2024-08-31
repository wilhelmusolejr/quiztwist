import Button from "./Button";

function QuizQuestion() {
  return (
    <>
      <div className="quiz text-center py-5">
        {/* question */}
        <h2 className="text-light">
          Which is the most popular JavaScript framework?
        </h2>

        {/* options */}
        <div className="quiz-option text-light">
          <Button className={`btn-option mt-3`}>Angular</Button>
          <Button className={`btn-option mt-3`}>Angular</Button>
          <Button className={`btn-option mt-3`}>Angular</Button>
          <Button className={`btn-option mt-3`}>Angular</Button>
        </div>
      </div>
    </>
  );
}

export default QuizQuestion;

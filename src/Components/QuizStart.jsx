import Section from "./Section";
import Button from "./Button";

function QuizStart() {
  return (
    <Section className="text-center position-center d-none">
      <h2>15 questions to test your React Mastery!</h2>
      <Button className={`btn-primary mt-4`}>{"Let's start"}</Button>
    </Section>
  );
}

export default QuizStart;

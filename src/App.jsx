import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSackDollar } from "@fortawesome/free-solid-svg-icons";

// components
import Navigator from "./Components/Navigator";
import Button from "./Components/Button";
import Section from "./Components/Section";

function App() {
  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        <Section className="text-center">
          <h2>15 questions to test your React Mastery!</h2>
          <Button>{"Let's start"}</Button>
        </Section>

        {/* Quiz */}
        <Section className="question-parent">
          <div className="container question-container p-3 rounded">
            {/* info */}
            <div className="quiz-info">
              {/* progress */}
              <progress
                value="90"
                max="100"
                className="progress-bar"
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

            <div className="quiz text-center py-5">
              {/* question */}
              <h2 className="text-light">
                Which is the most popular JavaScript framework?
              </h2>

              {/* options */}
              <div className="quiz-option text-light">
                <button className="btn btn-option mt-3">Angular</button>
                <button className="btn btn-option mt-3">Angular</button>
                <button className="btn btn-option mt-3">Angular</button>
                <button className="btn btn-option mt-3">Angular</button>
              </div>
            </div>

            <div className=" d-flex justify-content-between align-items-center">
              <div className="quiz-time">
                <span>Time Left: 00:00:00</span>
              </div>
              <button className="btn btn-primary">Next</button>
            </div>
          </div>
        </Section>

        {/* finish */}
        <Section className="finish-parent">
          <div className="text-center">
            <h2>Thanks for taking the quiz!</h2>
            <h3 className="my-3">Well done!</h3>
          </div>
          <div className="ms-4 mt-5">
            <div className="d-flex align-items-center gap-3 p-2 ">
              <FontAwesomeIcon icon={faCircleCheck} className="check-parent" />
              <p>5 out of 10 questons passed!</p>
            </div>
            <div className="d-flex align-items-center gap-3 p-2 ">
              <FontAwesomeIcon icon={faSackDollar} className="points-parent" />
              <p>280 points earned!</p>
            </div>
          </div>
        </Section>
      </header>
    </>
  );
}

export default App;

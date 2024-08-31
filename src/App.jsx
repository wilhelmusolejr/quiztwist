import Navigator from "./Components/Navigator";

function App() {
  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        <div className="container text-center position-center d-none">
          <h2>15 questions to test your React Mastery!</h2>
          <button className="btn btn-primary mt-4">Let&apos;s start</button>
        </div>

        {/* Quiz */}
        <div className="container position-center question-parent">
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
        </div>
      </header>
    </>
  );
}

export default App;

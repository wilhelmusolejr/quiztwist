import PropTypes from "prop-types";
import Section from "./Section";
import CategoryContainer from "./CategoryContainer";
import Modal from "./Modal";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function QuizReady({ dispatch, icon, number_question, quiz_title }) {
  const { user } = useContext(AuthContext);

  function handleStart() {
    if (user) {
      dispatch({ type: "START_QUIZ" });
    }
  }

  return (
    <>
      <Section className="text-center position-center">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <CategoryContainer icon={icon} title={quiz_title} />
        </div>

        <h2>
          {number_question} questions to test your {quiz_title} knowledge!
        </h2>

        <button
          className="btn btn-primary mt-4"
          data-bs-toggle={user ? "" : "modal"}
          data-bs-target={user ? "" : "#checkUserModal"}
          onClick={user ? handleStart : null}
        >
          {"Let's start"}
        </button>
      </Section>

      <Modal id={"checkUserModal"} modalTitle={"Are you sure?"}>
        <p>
          You&apos;re not currently logged in. If you continue, your progress
          will not be saved.
        </p>

        <hr />

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={() => dispatch({ type: "START_QUIZ" })}
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
}

// Define PropTypes for the component
QuizReady.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default QuizReady;

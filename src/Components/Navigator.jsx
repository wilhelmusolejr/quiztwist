import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./Navigator.bundle.css";

const Navigator = () => {
  return (
    <nav className="container py-3">
      <div className={`container nav-parent`}>
        <div className="logo">
          <a href="#" className="text-decoration-none text-light">
            QuizTwist
          </a>
        </div>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
};

export default Navigator;

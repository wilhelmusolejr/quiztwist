import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navigator.module.css";
import Logo from "./Logo";

const Navigator = () => {
  return (
    <nav className={`container ${styles["nav-parent"]}`}>
      <div
        className={`container d-flex justify-content-between align-items-center ${styles["nav-container"]}`}
      >
        <Logo />
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
};

export default Navigator;

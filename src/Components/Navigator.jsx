import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navigator.module.css";
import Logo from "./Logo";

const Navigator = () => {
  const handleMenuClick = () => {
    document
      .querySelector(`.${styles["nav-link-parent"]}`)
      .classList.toggle(`${styles["show"]}`);
  };

  return (
    <nav className={`container ${styles["nav-parent"]}`}>
      <div
        className={`container d-flex justify-content-between align-items-center ${styles["nav-container"]}`}
      >
        <Logo />

        {/* Dropdown menu */}
        <ul
          className={`d-flex list-unstyled gap-2 ${styles["nav-link-parent"]} ${styles["show"]}`}
        >
          <li>
            <a href="#home">Categories</a>
          </li>
          <li>
            <a className="btn btn-primary" href="#">
              Login
            </a>
          </li>
        </ul>

        <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
      </div>
    </nav>
  );
};

export default Navigator;

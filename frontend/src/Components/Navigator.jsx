import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSackDollar } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navigator.module.css";
import Logo from "./Logo";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";

const Navigator = () => {
  const { user, logout } = useContext(AuthContext);

  const handleMenuClick = () => {
    document
      .querySelector(`.${styles["nav-link-parent"]}`)
      .classList.toggle(`${styles["show"]}`);
  };

  return (
    <>
      <nav className={`container ${styles["nav-parent"]}`}>
        <div
          className={`container d-flex justify-content-between align-items-center ${styles["nav-container"]}`}
        >
          <Logo />

          {/* Dropdown menu */}
          <ul
            className={`d-flex list-unstyled gap-2 ${styles["nav-link-parent"]} `}
          >
            <li>
              <a href="#home">Categories</a>
            </li>
            {!user ? (
              <li className="ms-sm-0 ms-md-4 mt-2 mt-md-0">
                <a
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </a>
              </li>
            ) : (
              <>
                <li className="ms-sm-0 ms-md-2 mt-1 mt-md-0">
                  <p className="border py-2 px-4 rounded">
                    <FontAwesomeIcon
                      icon={faSackDollar}
                      className="icon-coin me-2"
                    />{" "}
                    5000
                  </p>
                </li>
                <li className="ms-sm-0 ms-md-4 mt-2 mt-md-0">
                  <a
                    href="/logout"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>

          <FontAwesomeIcon
            icon={faBars}
            onClick={handleMenuClick}
            className={`${styles["icon-bars"]}`}
          />
        </div>
      </nav>

      {/* login */}
      <ModalLogin />

      {/* resgister */}
      <ModalRegister />
    </>
  );
};

export default Navigator;

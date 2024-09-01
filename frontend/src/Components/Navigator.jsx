import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navigator.module.css";
import Logo from "./Logo";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Navigator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, logout } = useContext(AuthContext);

  async function registerFormSubmit(e) {
    e.preventDefault();

    // Prepare the data to send
    const userData = {
      firstName,
      lastName,
      email,
      birthdate,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userData
      );

      if (response.data.sucess) {
        login(response.data.user, response.data.token);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  }

  async function loginFormSubmit(e) {
    e.preventDefault();

    // Prepare the data to send
    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      );

      if (response.data.sucess) {
        login(response.data.user, response.data.token);
      }
    } catch (error) {
      console.log(error.response);

      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  }

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
            className={`d-flex list-unstyled gap-2 ${styles["nav-link-parent"]} ${styles["show"]}`}
          >
            <li>
              <a href="#home">Categories</a>
            </li>
            {!user ? (
              <li className="ms-4">
                <a
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Login
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/logout"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>

          <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
        </div>
      </nav>

      {/* login */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={loginFormSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div id="emailHelp" className="form-text">
                    We will never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">
                  Login
                </button>

                <hr />

                <div className="text-center d-flex justify-content-center gap-1">
                  <p>Not a member yet?</p>
                  <a
                    href="#"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* resgister */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Register
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  registerFormSubmit(e);
                }}
              >
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div id="emailHelp" className="form-text">
                    We will never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="birthdate" className="form-label">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => {
                      setBirthdate(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">
                  Register
                </button>

                <hr />

                <div className="text-center d-flex justify-content-center gap-1">
                  <p>Already a member?</p>
                  <a
                    href="#"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigator;

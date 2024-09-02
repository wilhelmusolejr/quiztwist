import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Modal from "./Modal";

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

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

  return (
    <Modal id={"registerModal"} modalTitle={"Register"}>
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
    </Modal>
  );
}

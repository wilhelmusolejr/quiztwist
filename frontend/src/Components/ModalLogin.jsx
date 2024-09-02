import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Modal from "./Modal";

export default function ModalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

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

  return (
    <Modal id={"loginModal"} modalTitle={"Login"}>
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
    </Modal>
  );
}

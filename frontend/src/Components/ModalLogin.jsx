import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Modal from "./Modal";
import LabelInput from "./LabelInput";

const BACKEND_URL = `https://quiztwist-backend.vercel.app/api`;

export default function ModalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  async function loginFormSubmit(e) {
    e.preventDefault();

    // Trim whitespace from email and password
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    // Prepare the data to send
    const userData = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, userData);

      if (response.data.success) {
        login(response.data.user, response.data.token);
        window.location.reload();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setPassword("");
    }
  }

  return (
    <Modal id={"loginModal"} modalTitle={"Login"}>
      <form onSubmit={loginFormSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Email */}
        <div className="mb-3">
          <LabelInput
            id={"emailLogin"}
            label={"Email address"}
            value={email}
            setValue={setEmail}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <LabelInput
            id={"passwordLogin"}
            type="password"
            label={"Password"}
            value={password}
            setValue={setPassword}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 my-4">
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

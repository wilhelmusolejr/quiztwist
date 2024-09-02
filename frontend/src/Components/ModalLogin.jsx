import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Modal from "./Modal";
import LabelInput from "./LabelInput";

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

        {/* Email */}
        <div className="mb-3">
          <LabelInput
            id={"email"}
            label={"Email address"}
            value={email}
            setValue={setEmail}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <LabelInput
            id={"password"}
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

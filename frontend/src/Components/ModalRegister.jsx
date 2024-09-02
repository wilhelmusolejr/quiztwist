import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Modal from "./Modal";
import LabelInput from "./LabelInput";

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
        {/* first name */}
        <div className="mb-3">
          <LabelInput
            id={"firstName"}
            label={"First Name"}
            value={firstName}
            setValue={setFirstName}
          />
        </div>

        {/* last name */}
        <div className="mb-3">
          <LabelInput
            id={"lastName"}
            label={"Last Name"}
            value={lastName}
            setValue={setLastName}
          />
        </div>

        {/* email */}
        <div className="mb-3">
          <LabelInput
            id={"email"}
            type="email"
            label={"Email address"}
            value={email}
            setValue={setEmail}
          />

          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>

        {/* birthdate */}
        <div className="mb-3">
          <LabelInput
            id={"birthdate"}
            label={"Birthdate"}
            type="date"
            value={birthdate}
            setValue={setBirthdate}
          />
        </div>

        {/* password */}
        <div className="mb-3">
          <LabelInput
            id={"password"}
            label={"Password"}
            type="password"
            value={password}
            setValue={setPassword}
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
            data-bs-target="#loginModal"
          >
            Login
          </a>
        </div>
      </form>
    </Modal>
  );
}

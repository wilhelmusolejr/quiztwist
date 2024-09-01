import Navigator from "../Components/Navigator";
import Section from "../Components/Section";

function Register() {
  return (
    <>
      <Navigator />

      <header>
        <Section className="">
          <h1>Register</h1>
          <p>Register a new account</p>
          <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
            />
            <button type="submit">Register</button>
          </form>
        </Section>
      </header>
    </>
  );
}

export default Register;

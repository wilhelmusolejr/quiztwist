import Navigator from "../Components/Navigator";
import Section from "../Components/Section";

function Login() {
  return (
    <>
      <Navigator />

      <header>
        <Section className="">
          <h1>Login</h1>
          <p>Log in to your account</p>
          <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Log in</button>
          </form>

          <a href="/register">Register</a>
        </Section>
      </header>
    </>
  );
}

export default Login;

import Navigator from "./Components/Navigator";

function App() {
  return (
    <>
      <Navigator />

      <header>
        <div className="container text-center position-center w-100">
          <h2>15 questions to test your React Mastery!</h2>
          <button className="btn btn-primary mt-4">Let&apos;s start</button>
        </div>
      </header>
    </>
  );
}

export default App;

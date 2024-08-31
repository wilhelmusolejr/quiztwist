// components
import Navigator from "./Components/Navigator";
import QuizFinish from "./Components/QuizFinish";
import QuizProgress from "./Components/QuizProgress";
import QuizStart from "./Components/QuizStart";

function App() {
  return (
    <>
      <Navigator />

      <header>
        {/* START */}
        <QuizStart />

        {/* Quiz */}
        <QuizProgress />

        {/* finish */}
        <QuizFinish />
      </header>
    </>
  );
}

export default App;

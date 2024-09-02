import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizStart from "./Pages/QuizStart";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizStart />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuizStart from "./Pages/QuizStart";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category" element={<QuizStart />} />
        <Route path="/logout" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

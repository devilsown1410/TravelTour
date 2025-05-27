import "./App.css";
import Project from "./components/Project";
import Board from "./Page/Board";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <>
    //   <Board />
    // </>
    <Router>
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/project/:projectId" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;

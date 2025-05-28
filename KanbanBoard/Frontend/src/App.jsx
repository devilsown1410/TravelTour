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
        <Route path="*" element={<div className="flex justify-center items-center h-screen"><h1 className="text-2xl font-bold">Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;

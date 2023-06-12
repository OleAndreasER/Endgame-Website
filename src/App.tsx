import "./app.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { NavBar } from "./nav-bar/nav-bar";
import { TrainingLog } from "./training-log/training-log";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<TrainingLog />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

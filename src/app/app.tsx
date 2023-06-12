import "./app.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { NavBar } from "../nav-bar/nav-bar";
import { TrainingLog } from "../training-log/training-log";
import { Lifts } from "../lifts/lifts";
import { Program } from "../program/program";
import { TrainingProfile } from "../training-profile/training-profile";
import { UserProfile } from "../user-profile/user-profile";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<TrainingLog />} />
          <Route path="/lifts" element={<Lifts />} />
          <Route path="/program" element={<Program />} />
          <Route path="/training-profile" element={<TrainingProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

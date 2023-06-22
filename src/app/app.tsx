import "./app.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { NavBar } from "../nav-bar/nav-bar";
import { TrainingLog } from "../training-log/training-log";
import { ProgramPage } from "../program/program-page";
import { TrainingProfile } from "../training-profile/training-profile";
import { UserProfile } from "../user-profile/user-profile";
import { LiftsPage } from "../lifts/lifts-page";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<TrainingLog />} />
          <Route path="/lifts" element={<LiftsPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/training-profile" element={<TrainingProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

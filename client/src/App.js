import logo from "./logo.svg";
import "./App.css";
import TeamStatus from "./pages/TeamStatus";

import BrowseProjects from "./pages/BrowseProjects";
import CreateProfile from "./pages/CreateProfile";
import CreateTeam from "./pages/CreateTeam";
import LoginPage from "./pages/LoginPage";
import JoinExistingTeam from "./pages/JoinExistingTeam";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
var cors = require("cors");

function App() {
  return (
    <Routes>
      <Route path="/status" element={<TeamStatus />} />
      <Route path="/create" element={<CreateTeam />} />
      <Route path="/profile" element={<CreateProfile />} />
      <Route path="/browse" element={<BrowseProjects />} />
      <Route path="/join" element={<JoinExistingTeam />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

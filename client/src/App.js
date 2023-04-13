import logo from "./logo.svg";
import "./App.css";
import { useReducer } from "react";
import TeamStatus from "./pages/TeamStatus";
import BrowseProjects from "./pages/BrowseProjects";
import CreateProfile from "./pages/CreateProfile";
import CreateTeam from "./pages/CreateTeam";
import LoginPage from "./pages/LoginPage";
import JoinExistingTeam from "./pages/JoinExistingTeam";
import ProjectDetails from "./pages/ProjectDetails";
import ProfileDashboard from "./pages/ProfileDashboard";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from "./components/User";

var cors = require("cors");

const initialUserData = {
  id: "",
  first_name: "",
  // last_name: "",
  // email: "",
  // project_pref: [],
  // skills: [],
  logged_in: false,
  // team_id: "",
};

function reducer(state, userData) {
  return {
    ...state,
    id: userData.id,
    first_name: userData.first_name,
    logged_in: userData.logged_in,
  };
}

function App() {
  const [user, setUser] = useReducer(reducer, initialUserData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/status" element={<TeamStatus />} />
        <Route path="/create" element={<CreateTeam />} />
        <Route path="/profile" element={<CreateProfile />} />
        <Route path="/browse" element={<BrowseProjects />} />
        <Route path="/join" element={<JoinExistingTeam />} />
        <Route path="/details" element={<ProjectDetails />} />
        <Route path="/dashboard" element={<ProfileDashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

import "./App.css";
import { useReducer } from "react";
import TeamStatus from "./pages/TeamStatus";
import BrowseProjects from "./pages/BrowseProjects";
import CreateProfile from "./pages/CreateProfile";
import CreateSSOProfile from "./pages/CreateSSOProfile";
import CreateTeam from "./pages/CreateTeam";
import LoginPage from "./pages/LoginPage";
import BrowseExistingTeam from "./pages/BrowseExistingTeams";
import ProjectDetails from "./pages/ProjectDetails";
import ProfileDashboard from "./pages/ProfileDashboard";
import TeamDetails from "./pages/TeamDetails";
import TeamDashboard from "./pages/TeamDashboard";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext, initialUserData, reducer } from "./components/User";

function App() {
  const [user, setUser] = useReducer(reducer, initialUserData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/status" element={<TeamStatus />} />
        <Route path="/create" element={<CreateTeam />} />
        <Route path="/profile" element={<CreateProfile />} />
        <Route path="/ssoprofile" element={<CreateSSOProfile />} />
        <Route path="/browse" element={<BrowseProjects />} />
        <Route path="/join" element={<BrowseExistingTeam />} />
        <Route path="/details" element={<ProjectDetails />} />
        <Route path="/team_details" element={<TeamDetails />} />
        <Route path="/team_dashboard" element={<TeamDashboard />} />
        <Route path="/dashboard" element={<ProfileDashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

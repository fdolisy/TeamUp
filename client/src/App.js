import logo from './logo.svg';
import './App.css';
import TeamStatus from "./pages/TeamStatus"

import JoinTeam from "./pages/JoinTeam"
import CreateProfile from "./pages/CreateProfile"
import CreateTeam from "./pages/CreateTeam"


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path='/' element={<TeamStatus />} />
      <Route path='/status' element={<TeamStatus />} />
      <Route path='/create' element={<CreateTeam />} />
      <Route path='/profile' element={<CreateProfile />} />
      <Route path='/join' element={<JoinTeam />} />


    </Routes>
  );
}

export default App;

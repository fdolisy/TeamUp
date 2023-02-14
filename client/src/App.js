import logo from './logo.svg';
import './App.css';
import Starting from "./pages/Starting"
import CreateTeam from "./pages/CreateTeam"
import JoinTeam from "./pages/JoinTeam"


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Starting />} />
      <Route path='/create' element={<CreateTeam />} />
      <Route path='/join' element={<JoinTeam />} />


    </Routes>
  );
}

export default App;

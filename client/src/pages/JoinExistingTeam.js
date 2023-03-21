import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const JoinExistingTeam = () => {
  let navigate = useNavigate();

  return (
    <div className="bg-offWhite">
      <Navbar />
    </div>
  );
};
export default JoinExistingTeam;

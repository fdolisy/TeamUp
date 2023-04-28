import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
const apiURL = "http://localhost:8082/api";

export default function JoinTeam() {
  const location = useLocation();
  console.log(location);
  const team = location.state.team;

  var password = null;
  const handlePassword = (e) => {
    password = e.target.value;
  };

  function handleJoin() {
    axios
      .put(`${apiURL}/teams/join/:${team._id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div className="text-green py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            Team Number {team.team_number}
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold mb-4">Type:</p>
              <p className="text-xl">{team.is_public ? "Public" : "Private"}</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Finalized:</p>
              <p className="text-xl">{team.is_finalized ? "Yes" : "No"}</p>
            </div>
            <div className="">
              <p className="text-2xl font-bold mb-4">Team Members:</p>
              <ul>
                {team.member_details.map((member) => (
                  <li className="text-xl" key={member._id}>
                    {member.first_name} {member.last_name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <p className="text-2xl font-bold mb-4">Team Member Skills:</p>
              <ul>
                {team.member_details.map((member) => (
                  <li className="text-xl" key={member._id}>
                    {member.skills.join(" ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto my-4">
          <div className="grid grid-rows-2 grid-flow-col gap-8">
            <div className="row-span-2">
              <p className="text-2xl font-bold mb-4">Team Preferences:</p>
              <ul>
                {team.team_project_preferences.map((project, index) => (
                  <li className="text-xl" key={project}>
                    {index + 1}) {project}
                  </li>
                ))}
              </ul>
            </div>
            {team.is_public && (
              <div className="row-span-1 col-span-2">
                <input
                  type="password"
                  name="Team Password"
                  className={`w-80 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mt-4 `}
                  placeholder="Join Private Team With Password"
                  onChange={handlePassword}
                  value={password}
                />
              </div>
            )}
            <div className="row-span-2 col-span-2 mt-5">
              <button
                className="bg-green text-white px-10 py-2 rounded-md mx-3 "
                onClick={handleJoin}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

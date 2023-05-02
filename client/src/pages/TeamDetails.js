import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "../components/User";

export default function TeamDetails() {
  let navigate = useNavigate();
  const location = useLocation();
  const team = location.state.team;
  const { setUser, user } = useContext(UserContext);// Importing the user context
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const authAxios = axios.create({
    baseURL: "http://csa-4485-02.utdallas.edu/api",
    headers: {
      "x-access-token": user.token,
    },
  });

  const joinTeam = () => {
    if (team.is_public) {
      authAxios
        .put(`teams/join/${team._id}`, {
          user_id: user.id,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Team Join Successful!");
          setTimeout(() => {
            navigate("/status");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      authAxios
        .put(`teams/join/${team._id}`, {
          user_id: user.id,
          team_password: password,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Team Join Successful!");
          setTimeout(() => {
            navigate("/status");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getMembers = async () => {
    try {
      const response = await authAxios.get(`teams/${team._id}`);
      setMembers(response.data.member_details);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await authAxios.get(`teams/${team._id}`);
      setProjects(response.data.project_preference_details);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
    getProjects();
  }, []);

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />
      <ToastContainer toastClassName="bg-green-500 text-white font-medium" />
      <div className="bg-offWhite text-green py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Team Information</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold mb-4">Team Number:</p>
              <p className="text-xl">{team.team_number}</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Current Team Members:</p>
              <ul className="text-xl">
                {members.map(member => (
                  <div key={member.id}>
                    <p>{member.first_name} {member.last_name}</p>
                  </div>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Project Preferences:</p>
              {projects && projects.length > 0 ? (
                <ul className="text-xl">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <p>{project.name ? project.name : "No Name Provided"}</p>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No Projects Available</p>
              )}
            </div>
          </div>
          <br />
          {!team.is_public && (
            <div className="mb-4">
              <p className="text-2xl font-bold mb-4">Private Team Password:</p>
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="team-password"
              >
                If you do not know the password, reach out to the team's creator.
              </label>
              <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                id="team-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <button
            className="orange text-3xl py-4 px-3"
            onClick={joinTeam}
          >
            Join Team
          </button>
        </div>
      </div>
    </div>
  );
}

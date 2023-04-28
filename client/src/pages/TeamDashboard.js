import axios from "axios";
import UserContext from "../components/User";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";

import { useNavigate, useLocation, useParams } from "react-router-dom";

var timings = null;
const apiURL = "http://localhost:8082/api";

const project_names = [];
const objs = [];
const projectOptions = [];

// get project list
axios
  .get("http://localhost:8082/api/projects/")
  .then((response) => {
    const project_objects = new Array(response.data);

    for (var i = 0; i < project_objects[0].length; i++) {
      // array of project objects
      objs.push(project_objects[0][i]);
    }
    objs.forEach((object) => {
      // array of project names
      project_names.push(object["name"]);
    });

    for (var i = 0; i < project_names.length; i++) {
      // used for drop down
      projectOptions.push({ value: objs[i], label: project_names[i] });
    }
  })
  .catch((error) => {
    console.log(error);
  });

export default function TeamDashboard() {
  const { setUser, user } = useContext(UserContext);
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState({});
  const teamMembers = [];

  async function getTeam() {
    try {
      axios
        .get(`${apiURL}/teams/${user.team_id}`)
        .then((response) => {
          console.log(response.data);
          setTeam(response.data);
          setMembers(response.data.member_details);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeam();
  }, []);

  for (let i = 0; i < members.length; i++) {
    teamMembers.push(
      <li key={i}>
        {members[i].first_name} {members[i].last_name}
      </li>
    );
  }

  var selectedProject1 = null;
  const handleProject1 = (e) => {
    selectedProject1 = e.value;
  };

  var selectedProject2 = null;
  const handleProject2 = (e) => {
    selectedProject2 = e.value;
  };

  var selectedProject3 = null;
  const handleProject3 = (e) => {
    selectedProject3 = e.value;
  };
  var selectedProject4 = null;
  const handleProject4 = (e) => {
    selectedProject4 = e.value;
  };
  var selectedProject5 = null;
  const handleProject5 = (e) => {
    selectedProject5 = e.value;
  };
  var selectedProject6 = null;
  const handleProject6 = (e) => {
    selectedProject6 = e.value;
  };
  var selectedProject7 = null;
  const handleProject7 = (e) => {
    selectedProject7 = e.value;
  };

  var selectedProject8 = null;
  const handleProject8 = (e) => {
    selectedProject8 = e.value;
  };

  var selectedProject9 = null;
  const handleProject9 = (e) => {
    selectedProject9 = e.value;
  };

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div className="bg-offWhite h-screen text-green py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Team {team.team_number}</h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold mb-4">Is Finalized:</p>
              <p className="text-xl">{team.is_finalized ? "Yes" : "No"}</p>
              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Is Public:</p>
                <p className="text-xl">{team.is_public ? "Yes" : "No"}</p>
              </div>
              <div className="">
                <p className="text-2xl font-bold mb-4">Timings:</p>
                <input
                  type="email"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="timings"
                  placeholder="Team Timings"
                />
              </div>
            </div>
            <div>
              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Members:</p>
                {teamMembers}
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green px-4 py-4">
            Top 9 Project Choices
          </h1>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <label> Project 1 </label>
              <Select options={projectOptions} onChange={handleProject1} />
            </div>
            <div className="w-1/3 mx-2 py-5">
              <label> Project 2 </label>
              <Select options={projectOptions} onChange={handleProject2} />
            </div>

            <div className="w-1/3 mx-2 py-5">
              <label> Project 3 </label>
              <Select options={projectOptions} onChange={handleProject3} />
            </div>
          </div>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <label> Project 4 </label>
              <Select options={projectOptions} onChange={handleProject4} />
            </div>
            <div className="w-1/3 mx-2 py-5">
              <label> Project 5 </label>
              <Select options={projectOptions} onChange={handleProject5} />
            </div>

            <div className="w-1/3 mx-2 py-5">
              <label> Project 6 </label>
              <Select options={projectOptions} onChange={handleProject6} />
            </div>
          </div>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <label> Project 7 </label>
              <Select options={projectOptions} onChange={handleProject7} />
            </div>
            <div className="w-1/3 mx-2 py-5">
              <label> Project 8 </label>
              <Select options={projectOptions} onChange={handleProject8} />
            </div>

            <div className="w-1/3 mx-2 py-5">
              <label> Project 9 </label>
              <Select options={projectOptions} onChange={handleProject9} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

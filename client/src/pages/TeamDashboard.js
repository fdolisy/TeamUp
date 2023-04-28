import axios from "axios";
import UserContext from "../components/User";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Select from "react-select";

const project_names = [];
const objs = [];
const projectOptions = [];
const apiURL = "http://localhost:8082/api";
axios
  .get(`${apiURL}/projects`)
  .then((response) => {
    const project_objects = new Array(response.data);

    for (var i = 0; i < project_objects[0].length; i++) {
      objs.push(project_objects[0][i]);
    }
    objs.forEach((object) => {
      project_names.push(object["name"]);
    });

    for (var i = 0; i < project_names.length; i++) {
      projectOptions.push({ value: objs[i], label: project_names[i] });
    }
  })
  .catch((error) => {
    console.log(error);
  });

export default function TeamDashboard() {
  const { setUser, user } = useContext(UserContext);
  const [team, setTeam] = useState({});
  //   const [projectNames, setProjectNames] = useState([]);
  //   //   const [members, setMembers] = useState([]);
  //   const [memberNames, setMemberNames] = useState([]);
  console.log(user);

  function handleSubmit() {
    const preferences = new Array(
      selectedProject1,
      selectedProject2,
      selectedProject3,
      selectedProject4,
      selectedProject5,
      selectedProject6,
      selectedProject7,
      selectedProject8,
      selectedProject9
    );
    console.log(preferences);
  }

  useEffect(() => {
    axios
      .get(`${apiURL}/teams/${user.team_id}`)
      .then((response) => {
        console.log(response.data);
        setTeam(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(team);

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

  var password = null;
  const handlePassword = (e) => {
    password = e.target.value;
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
                  type="text"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="timings"
                  placeholder="Team Timings"
                />
              </div>
            </div>
            <div className="py-10">
              <p className="text-2xl font-bold mb-4">Members:</p>
              <ul>
                {team.member_details.map((member) => (
                  <li className="text-xl" key={member._id}>
                    {member.first_name} {member.last_name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Top 9 Projects:</p>
              <ul>
                {team.project_preference_details.map((project, index) => (
                  <li className="text-xl" key={index}>
                    {project.name}
                  </li>
                ))}
              </ul>

              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Members:</p>
                <ul>
                  {team.member_details.map((member) => (
                    <li className="text-xl" key={member._id}>
                      {member.first_name} {member.last_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold text-orange px-4 py-4">
            Top 9 Project Choices
          </h1>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input1">Choice 1</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject1}
                  // // defaultValue={{
                  // //   label: handleProjectName(0),
                  // //   value: handleProjectName(0),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input2">Choice 2</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject2}
                  // // defaultValue={{
                  // //   label: handleProjectName(1),
                  // //   value: handleProjectName(1),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>

            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input3">Choice 3</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject3}
                  // // defaultValue={{
                  // //   label: handleProjectName(2),
                  // //   value: handleProjectName(2),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
          </div>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input4">Choice 4</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject4}
                  // // defaultValue={{
                  // //   label: handleProjectName(3),
                  // //   value: handleProjectName(3),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input5">Choice 5</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject5}
                  // // defaultValue={{
                  // //   label: handleProjectName(4),
                  // //   value: handleProjectName(4),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>

            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input6">Choice 6</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject6}
                  // // defaultValue={{
                  // //   label: handleProjectName(5),
                  // //   value: handleProjectName(5),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
          </div>

          <div className="bg-offWhite flex justify-between w-full px-5">
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input7">Choice 7</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject7}
                  // // defaultValue={{
                  // //   label: handleProjectName(6),
                  // //   value: handleProjectName(6),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input8">Choice 8</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject8}
                  // // defaultValue={{
                  // //   label: handleProjectName(7),
                  // //   value: handleProjectName(7),
                  // }}
                  className=" py-2 w-full"
                />
              </form>
            </div>

            <div className="w-1/3 mx-2 py-5">
              <form>
                <label htmlFor="input9">Choice 9</label>
                <Select
                  options={projectOptions}
                  onChange={handleProject9}
                  // // defaultValue={{
                  // //   label: handleProjectName(8),
                  // //   value: handleProjectName(8),
                  // }}
                  // value={{ selectedProject9 }}
                  className=" py-2 w-full"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

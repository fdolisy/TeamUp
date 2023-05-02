import axios from "axios";
import UserContext from "../components/User";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
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
  const [member, setMembers] = useState([]);
  let navigate = useNavigate();

  // const [project, setProjects] = useState([]);

  const [final, setFinal] = useState([]);

  const [publicStatus, setPublicStatus] = useState([]);

  const [number, setNumber] = useState([]);

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
    axios
      .put(`${apiURL}/teams/team_submit/${user.team_id}`, {
        timings: document.getElementById("timings").value.split(","),
        team_project_preferences: preferences,
      })
      .then((response) => {
        console.log(response);
        toast.success("Team submitted successfully!");
        setTimeout(() => {
          navigate("/status");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Please try again!");
        console.log(error);
      });
  }

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
  const getMembers = async () => {

    try {

      const response = await axios.get(`http://localhost:8082/api/teams/${user.team_id}`);

      setMembers(response.data.member_details);

    } catch (error) {

      console.log(error);

    }

  };
  const getFinal = async () => {

    try {

      const response = await axios.get(`http://localhost:8082/api/teams/${user.team_id}`);

      setFinal(response.data.is_finalized);

    } catch (error) {

      console.log(error);

    }

  };
  const getPublic = async () => {

    try {

      const response = await axios.get(`http://localhost:8082/api/teams/${user.team_id}`);

      setPublicStatus(response.data.is_public);

    } catch (error) {

      console.log(error);

    }

  };
  const getNumber = async () => {

    try {

      const response = await axios.get(`http://localhost:8082/api/teams/${user.team_id}`);

      setNumber(response.data.team_number);

      console.log(response.data.team_number)

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {
    getMembers()
    getFinal()
    getPublic()
    getNumber()
  }, []);


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
      <ToastContainer toastClassName="bg-green-500 text-white font-medium" />
      <div className="bg-offWhite h-screen text-green py-20 px-8">
        <div className="max-w-3xl mx-auto bg-offWhite">
          <h2 className="text-4xl font-bold mb-8">Team {number}</h2>

          <div className="grid grid-cols-2 gap-8 bg-offWhite">
            <div className="bg-offWhite">
              <p className="text-2xl font-bold mb-4">Is Finalized:</p>
              <p className="text-xl">{final ? "Yes" : "No"}</p>
              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Is Public:</p>
                <p className="text-xl">{publicStatus ? "Yes" : "No"}</p>
              </div>
              <div className="bg-offWhite">
                <p className="text-2xl font-bold mb-4">Timings (provide 3 times):</p>
                <input
                  type="email"
                  className={
                    "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  }
                  id="timings"
                  placeholder="Team Timings"
                />
                <p className="text-sm text-gray-500" id="timings-format">Please use this example for formatting: Mon - 3:30</p>
              </div>
            </div>
            <div className="bg-offWhite">
              <div className="bg-offWhite py-10">
                <p className="text-2xl font-bold mb-4">Members:</p>
                <ul>
                  {member.map((member) => (
                    <li className="text-xl" key={member.id}>
                      {member.first_name} {member.last_name}
                    </li>

                  ))}
                </ul>
              </div>
            </div>
          </div>
          <br />
          <h1 className="text-2xl font-bold mb-4">
            Top 9 Project Choices
          </h1>

          <div className="bg-offWhite flex justify-between w-full">
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

          <div className="bg-offWhite flex justify-between w-full">
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

          <div className="bg-offWhite flex justify-between w-full">
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
          <br />
          <button
            className="bg-green text-white px-10 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
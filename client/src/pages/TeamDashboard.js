import axios from "axios";
import UserContext from "../components/User";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

var team_num = null;
var is_finalized = null;
var is_public = null;
var timings = null;
const apiURL = "http://localhost:8082/api";

export default function TeamDashboard() {
  const { setUser, user } = useContext(UserContext);
  const [team, setTeam] = useState({});
  //   const [projectNames, setProjectNames] = useState([]);
  //   //   const [members, setMembers] = useState([]);
  //   const [memberNames, setMemberNames] = useState([]);
  console.log(user);
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
                <p className="text-xl">{timings}</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Top 9 Projects:</p>
              <ul>
                {team.project_preference_details.map((project, index) => (
                  <li className="text-xl" key={index}>
                    {console.log(project)}
                  </li>
                ))}
              </ul>

              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Members:</p>
                {/* <ul>
                  {team.member_details.map((member) => (
                    <li className="text-xl" key={member._id}>
                      {member.first_name} {member.last_name}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

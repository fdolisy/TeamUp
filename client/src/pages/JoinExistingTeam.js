import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const JoinExistingTeam = () => {
  const [teams, setTeams] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("api/teams")
      .then((response) => {
        // const project_objects = new Array(response.data);
        setTeams(response.data);
        console.log(teams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(team) {
    console.log(`Clicked on project "${team.team_number}"`);
    navigate(`/team_details`, { state: { team } });
  }

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Is Public
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Is Finalized
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Top Project
            </th>
          </tr>
        </thead>

        <tbody className="bg-offWhite divide-y divide-gray-200">
          {teams.map((team) => (
            <tr
              className="hover:bg-orange cursor-pointer"
              key={team.id}
              onClick={() => handleClick(team)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {team.team_number}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {team.is_public ? "Yes" : "No"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {team.is_finalized ? "Yes" : "No"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {team.members.length}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default JoinExistingTeam;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const apiURL = "http://localhost:8082/api";

const BrowseExistingTeams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${apiURL}/teams`)
      .then((response) => {
        // const project_objects = new Array(response.data);
        setTeams(response.data);
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

      <div className="py-8 px-8 flex flex-row justify-between">
        <input
          type="text"
          className={`w-80 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          id="search"
          value={searchTerm}
          placeholder="Search by Number"
          onChange={handleSearch}
        />
        <div className="">
          {/* <label
            for="Team Password"
            className="text-m font-medium text-gray-700 mx-3"
          >
            Join private team
          </label> */}
          {/* <input
            type="password"
            name="Team Password"
            className={`w-80 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 `}
            placeholder="Join Private Team With Password"
            onChange={handlePassword}
            value={password}
          />
          <button
            className="bg-green text-white px-10 py-2 rounded-md mx-3 "
            onClick={handleJoin}
          >
            Join
          </button> */}
        </div>
      </div>

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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Number of Members
            </th>
          </tr>
        </thead>

        <tbody className="bg-offWhite divide-y divide-gray-200">
          {teams
            .filter((team) => {
              return searchTerm.toString() === ""
                ? team
                : team.team_number.toString().includes(searchTerm);
            })
            .map((team) => (
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
                    {team.project_details[0].name}
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
export default BrowseExistingTeams;

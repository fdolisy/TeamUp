import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function BrowseProjects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/projects/")
      .then((response) => {
        // const project_objects = new Array(response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(project) {
    console.log(`Clicked on project "${project.name}"`);
  }

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div className="py-8 px-8">
        <input
          type="text"
          className={`w-80 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          id="search"
          value={searchTerm}
          placeholder="Search by Name"
          onChange={handleSearch}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
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
              Sponsor
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Desired Skills
            </th>
          </tr>
        </thead>

        <tbody className="bg-offWhite divide-y divide-gray-200">
          {projects
            .filter((project) => {
              return searchTerm.toLowerCase() === ""
                ? project
                : project.name.toLowerCase().includes(searchTerm);
            })
            .map((project) => (
              <tr
                className="hover:bg-orange cursor-pointer"
                key={project.id}
                onClick={() => handleClick(project)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {project.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{project.number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{project.sponsor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.desired_skills.join(", ")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

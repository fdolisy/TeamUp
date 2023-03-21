import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function JoinTeam() {
  const [projects, setProjects] = useState([]);

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
              Desired Skills
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sponsor
            </th>
          </tr>
        </thead>

        <tbody className="bg-offWhite divide-y divide-gray-200">
          {projects.map((project) => (
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

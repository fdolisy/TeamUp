import React from "react";

import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function ProjectDetails() {
  const location = useLocation();
  console.log(location);
  const project = location.state.project;
  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div className="text-green py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">{project.name}</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold mb-4">Project Number:</p>
              <p className="text-xl">{project.number}</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Sponsor:</p>
              <p className="text-xl">{project.sponsor}</p>
            </div>
            <div className="col-span-2">
              <p className="text-2xl font-bold mb-4">Desired Skills:</p>
              <ul>
                {project.desired_skills.map((skill) => (
                  <li className="text-xl" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

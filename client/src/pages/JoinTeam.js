import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const project_names = [];
const objs = [];
const projectOptions = [];

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
      projectOptions.push({
        name: object["name"],
        number: object["number"],
        desired_skills: object["desired_skills"],
        sponsor: object["sponsor"],
      });
    });

    console.log(projectOptions);
  })
  .catch((error) => {
    console.log(error);
  });

export default function JoinTeam() {
  return (
    <div className="bg-offWhite h-screen">
      <Navbar />
    </div>
  );
}

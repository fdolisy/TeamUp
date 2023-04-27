import axios from "axios";
import UserContext from "../components/User";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useContext } from "react";

export default function TeamDashboard() {
  const { setUser, user } = useContext(UserContext);
  const apiURL = "http://localhost:8082/api";
  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      "x-access-token": user.token,
    },
  });

  console.log(user);

  authAxios
    .get(`${apiURL}/users/6424d9ca854da7ab68e174a5`)
    .then((response) => {
      setUser({
        ...user,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        project_pref: response.data.project_pref,
        skills: response.data.skills,
        team_id: response.data.team_id,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    authAxios
      .get(`${apiURL}/teams/${user.team_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />
      <h1> </h1>
    </div>
  );
}

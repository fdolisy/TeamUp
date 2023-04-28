import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../components/User";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

export default function Navbar() {
  let navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const apiURL = "http://localhost:8082/api";

  function handleClick() {
    navigate("/status");
  }
  function profile() {
    navigate("/dashboard");
  }

  function team() {
    navigate("/team");
  }
  function logOut() {
    // const authAxios = axios.create({
    //   baseURL: apiURL,
    //   headers: {
    //     "x-access-token": user.token,
    //   },
    // });

    // authAxios
    //   .put(`${apiURL}/users/${user.id}`, { logged_in: false })
    //   .then((response) => {
    //     setUser({
    //       logged_in: false,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setUser({
      logged_in: false,
    });
    navigate("/");
  }

  return (
    <div className="bg-green py-4">
      <div className="flex justify-between place-items-center relative container text-offWhite">
        <div
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          className="flex place-items-center relative space-x-5 rounded-xl"
        >
          <GroupsIcon sx={{ fontSize: 65 }} />
          <div className="text-5xl font-bold">TeamUp!</div>
        </div>
        <div className="space-x-5">
          <IconButton aria-label="web-access">
            <PersonIcon
              className="text-offWhite"
              fontSize="large"
              onClick={profile}
            />
          </IconButton>
          <IconButton aria-label="web-access">
            <AutoAwesomeMosaicIcon
              className="text-offWhite"
              fontSize="large"
              onClick={team}
            />
          </IconButton>
          <IconButton aria-label="settings">
            <LogoutIcon
              className="text-offWhite"
              onClick={logOut}
              fontSize="large"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

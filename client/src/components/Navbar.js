import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="bg-green py-4">
      <div className="flex justify-between place-items-center relative container text-offWhite">
        <div
          onClick={handleClick}
          className="flex place-items-center relative space-x-5 rounded-xl"
        >
          <GroupsIcon sx={{ fontSize: 65 }} />
          <div className="text-5xl font-bold">TeamUp!</div>
        </div>
        <div className="space-x-5">
          <IconButton aria-label="web-access">
            <PersonIcon className="text-offWhite" fontSize="large" />
          </IconButton>
          <IconButton aria-label="settings">
            <SettingsIcon className="text-offWhite" fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileDashboard() {
  return (
    <div className="bg-offWhite h-screen">
      <Navbar />
    </div>
  );
}

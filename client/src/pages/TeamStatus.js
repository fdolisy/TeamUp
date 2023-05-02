import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import UserContext from "../components/User";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Starting() {
  let navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const apiURL = "http://csa-4485-02.utdallas.edu/api/";
  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      "x-access-token": user.token,
    },
  });

  useEffect(() => {
    authAxios
      .get(`${apiURL}/users/${user.id}`)
      .then((response) => {
        setUser({
          ...user,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          project_preferences: response.data.project_preferences,
          project_details: response.data.project_details,
          skills: response.data.skills,
          team_id: response.data.team_id,
          address: response.data.address,
          city: response.data.city,
          zip: response.data.zip,
          extra_information: response.data.extra_information,
          team_id: response.data.team,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createTeam() {
    navigate("/create");
  }

  function browseProjects() {
    navigate("/browse");
  }
  function joinExistingTeam() {
    navigate("/join");
  }

  function finalizeTeams() {
    axios
      .get("http://csa-4485-02.utdallas.edu//api/teams/submit_all")
      .then((response) => {
        toast.success("Finalized team data sent to administrator's email")
      })
      .catch((error) => {
        toast.error("Failed to finalize all teams" + error);
      });
  }

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />
      <ToastContainer toastClassName="bg-green-500 text-white font-medium" />
      <div className="flex h-screen">
        <div className="flex flex-col m-auto">
          <div className="shadow-lg rounded-lg w-[500px] p-3">
            <div className="space-y-4">
              <div className="text-6xl font-bold">
                Greetings {user.first_name}
              </div>
              <div className="text-lg"> Please make a selection</div>
              <div className="flex flex-col space-y-4 py-4">
                <button
                  className="orange text-3xl py-4 px-3"
                  onClick={createTeam}
                >
                  Create a Team
                </button>
                <button
                  className="orange text-3xl py-4 px-3"
                  onClick={joinExistingTeam}
                >
                  Join an Existing Team
                </button>
                <button
                  className="orange text-3xl py-4 px-3"
                  onClick={browseProjects}
                >
                  Browse Projects
                </button>
                {user.email === process.env.ADMIN_EMAIL && (
                  <button
                    className="orange text-3xl py-4 px-3"
                    onClick={finalizeTeams}
                  >
                    [admin-only] Finalize All Teams
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

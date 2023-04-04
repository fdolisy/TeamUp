import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import UserContext from "../components/User";

export default function Starting() {
  let navigate = useNavigate();

  function createTeam() {
    navigate("/create");
  }

  function browseProjects() {
    navigate("/browse");
  }
  function joinExistingTeam() {
    navigate("/join");
  }

  const user = useContext(UserContext);
  console.log(user);
  // console.log(user.user);
  // console.log(user.user.user);
  return (
    <div className="bg-offWhite">
      <Navbar />
      <div className="flex h-screen">
        <div className="flex flex-col m-auto">
          <div className="shadow-lg rounded-lg w-[500px] p-3">
            <div className="space-y-4">
              <div className="text-6xl font-bold">
                Greetings {user.user.userData[1]}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

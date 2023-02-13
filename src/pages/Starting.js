import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";



export default function Starting() {
    let navigate = useNavigate();

    function createTeam() {
        navigate("/create")

    }

    function joinTeam() {
        navigate("/join")

    }


    return (
        <div className="bg-offWhite">
          <Navbar />
          <div class="flex h-screen">
            <div className="flex flex-col m-auto">
              <div className="shadow-lg rounded-lg w-[500px] p-3">
                <div className="space-y-4">
                  <div className="text-6xl font-bold">Greetings</div>
                  <div className="text-lg"> Please make a selection</div>
                  <div className="flex flex-col space-y-4 py-4">
                    <button className="orange text-3xl py-4 px-3" onClick={createTeam}>
                      Create a Team
                    </button>
                    <button className="orange text-3xl py-4 px-3" onClick={joinTeam}>
                      Team in Mind
                    </button>
                    <button className="orange text-3xl py-4 px-3" onClick={joinTeam}>
                      Need a Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

}


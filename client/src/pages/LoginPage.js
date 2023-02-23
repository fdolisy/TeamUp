import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JoinTeam() {

    let navigate = useNavigate()
  function HandleSubmit() {
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("password").value);

    navigate("/status")
  }

  return (
    <div className="bg-offWhite">
      <Navbar />

      <div class="flex h-screen">
        <div className="flex flex-col m-auto">
          <div className="shadow-lg rounded-lg w-[500px] p-3">
            <div className="space-y-4">
              <div className="text-center text-6xl font-bold">Hello!</div>
              <div className="flex flex-col space-y-4 py-4">
                <form onSubmit={HandleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="password"
                      placeholder="Your Password"
                    />
                  </div>

                  <div className="flex justify-center items-center mt-6">
                    <button
                      className={"obtn text-2xl py-3 px-4 "}
                      onClick={HandleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

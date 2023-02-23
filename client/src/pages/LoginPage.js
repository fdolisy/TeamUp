import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    let navigate = useNavigate()
  function HandleSubmit() {
    

    axios.post("http://localhost:8082/api/login", {
        email: document.getElementById("email").value,
        password: document.getElementById('password').value,
    })
    .then(response => {
      console.log("hello")
      navigate("/status")
    })
    .catch(error => {
      console.log("invalid")
      console.log(error);
    });

    
  }

  function HandleSignUp() {
    navigate("/profile")
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

                  <div className="flex space-x-10 justify-center items-center mt-6">
                    <button
                      className={"obtn text-2xl py-3 px-4 "}
                      onClick={HandleSubmit}
                    >
                      Login
                    </button>

                  

                    <button
                      className={"obtn text-2xl py-3 px-4 "}
                      onClick={HandleSignUp}
                    >
                      Sign Up
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

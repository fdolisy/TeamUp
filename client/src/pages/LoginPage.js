import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../components/User";
import { parse_attributes } from '../sso_helper.js'

const LoginPage = () => {
  let navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const apiURL = "http://localhost:8082/api";

  // Check whether the user has already signed in with SSO
  fetch('http://csa-4485-02.utdallas.edu/Shibboleth.sso/Session')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      if (data.includes('mail')) {
        const attributes = parse_attributes(data)

        // try to login this user
        axios
          .post(`${apiURL}/login`, {
            email: attributes[2],
            password: "SSO",
          })
          .then((response) => {
            setUser({
              ...user,
              token: response.data.token,
              id: response.data.userID,
              logged_in: true,
            });
            navigate("/status");
          })
          .catch((error) => {
            // if there is no account yet, go to the sign-up page
            navigate("/ssoprofile");
          });
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });


  function HandleSubmit() {
    axios
      .post(`${apiURL}/login`, {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        setUser({
          ...user,
          token: response.data.token,
          id: response.data.userID,
          logged_in: true,
        });
        navigate("/status");
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  }

  async function HandleSSO() {
    // Check whether the user has already signed in with SSO
    fetch('http://csa-4485-02.utdallas.edu/Shibboleth.sso/Session')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        if (data.includes('mail')) {
          const attributes = parse_attributes(data)

          // try to login this user
          axios
            .post(`${apiURL}/login`, {
              email: attributes[2],
              password: "SSO",
            })
            .then((response) => {
              console.log('2')
              setUser({
                ...user,
                token: response.data.token,
                id: response.data.userID,
                logged_in: true,
              });
              navigate("/status");
            })
            .catch((error) => {
              console.log('1')
              var popup = window.open("https://csa-4485-02.utdallas.edu/Shibboleth.sso/Login", "popup", 'width=600,height=600');
            });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function HandleSignUp() {
    navigate("/profile");
  }
  return (
    <div className="bg-offWhite">
      <Navbar />

      <div className="flex h-screen">
        <div className="flex flex-col m-auto">
          <div className="shadow-lg rounded-lg w-[500px] p-3">
            <div className="space-y-4">
              <div className="text-center text-6xl font-bold">Hello!</div>

              {showAlert && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Invalid Credentials!</strong>
                  <span className="block sm:inline"> Please try again. </span>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="absolute top-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 1 0-1.414-1.414L10 8.586 6.066 4.652a1 1 0 0 0-1.414 1.414L8.586 10l-3.934 3.934a1 1 0 1 0 1.414 1.414L10 11.414l3.934 3.934a1 1 0 1 0 1.414-1.414L11.414 10l3.934-3.934z" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex flex-col space-y-4 py-2">
                <button
                  className={"obtn text-2xl py-3 px-4 "}
                  onClick={HandleSSO}
                >
                  Login with UTD SSO
                </button>
                <br />
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
};
export default LoginPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateAccount = () => {
    let navigate = useNavigate();

    const HandleSubmit = () => {
        
    }

    return (
        <div className="bg-offWhite">
      <Navbar />
      <div className="h-screen flex bg-gray-bg1">
      <div className="shadow-lg rounded-lg w-100 h-screen p-10">
          <h1 className="text-3xl font-bold text-primary mt-4 mb-12 text-center">
            Hello Admin! 🔐
          </h1>

          <form onSubmit={HandleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="email"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="password"
                placeholder="Last Name"
              />
            </div>

            <div className="flex justify-center items-center mt-6">
              <button
                className={"btn text-2xl py-3 px-4 "}
                // onClick= {HandleFormSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    );

}
export default CreateAccount;
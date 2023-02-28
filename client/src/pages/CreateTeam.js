import React from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const CreateTeam = () => {
  // let navigate = useNavigate();
  function handleSubmit() {
    axios
      .post("http://localhost:8082/api/", {})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-offWhite">
      <Navbar />

      <div className="flex flex-col">
        <div className="basis-5/6 px-4">
          <h1 className="text-4xl text-center font-bold text-orange py-4">
            Team X
          </h1>
          <div className="flex flex-col shadow sm:rounded-md">
            {/* <div className="basis-1/2"></div>
            <div className="basis-1/2"></div> */}

            <div className="mt-5 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-2 md:col-span-2 md:mt-0">
                  <div className="overflow-hidden ">
                    <div className="space-y-6 px-4 py-5 sm:p-6">
                      <fieldset>
                        <legend className="contents text-sm font-semibold text-gray-900">
                          Select Team Type
                        </legend>
                        <p className="text-sm text-gray-500">
                          Other students will require a password to join a
                          private team.
                        </p>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="private"
                              name="team"
                              type="radio"
                              className="h-4 w-4 border-gray-300 "
                            />
                            <label
                              htmlFor="private"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Private
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="public"
                              name="team"
                              type="radio"
                              className="h-4 w-4 border-gray-300 "
                            />
                            <label
                              htmlFor="public"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Public
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label for="Team Password" className="block text-sm font-medium text-gray-700">Team Password</label>
                        <input type="password" name="Team Password" id="team_password" className="py-2 px-3 mt-4 block w-half rounded-md border shadow-sm sm:text-sm "/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-xl font-bold text-orange px-4 py-4">
              Top 9 Project Choices
            </h1>

            <div className="bg-offWhite flex justify-between w-full px-5">
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 1</label>
                  <input
                    type="text"
                    id="c1"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 2</label>
                  <input
                    type="text"
                    id="c2"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 3</label>
                  <input
                    type="text"
                    id="c3"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 4</label>
                  <input
                    type="text"
                    id="c4"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 5</label>
                  <input
                    type="text"
                    id="c5"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 6</label>
                  <input
                    type="text"
                    id="c6"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 7</label>
                  <input
                    type="text"
                    id="c7"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 8</label>
                  <input
                    type="text"
                    id="c8"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 9</label>
                  <input
                    type="text"
                    id="c9"
                    className="border rounded py-2 px-3 w-full"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/6">
          <div className="flex justify-end px-10 py-10">
            <button
              className="bg-green text-white px-10 py-2 rounded-md "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateTeam;

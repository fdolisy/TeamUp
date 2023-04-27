import React, { useCallback }  from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import UserContext from "../components/User";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const project_names = [];
const objs = [];
const projectOptions = [];

axios
  .get("api/projects/")
  .then((response) => {
    const project_objects = new Array(response.data);

    for (var i = 0; i < project_objects[0].length; i++) {
      objs.push(project_objects[0][i]);
    }
    objs.forEach((object) => {
      project_names.push(object["name"]);
    });

    for (var i = 0; i < project_names.length; i++) {
      projectOptions.push({ value: objs[i], label: project_names[i] });
    }
  })
  .catch((error) => {
    console.log(error);
  });

const CreateTeam = () => {
  const user = useContext(UserContext);
  const [isPublic, setIsPublic] = useState(true);
  const [teamNumber, setTeamNum] = useState(0);
  function handleSubmit() {
    const preferences = new Array(
      selectedProject1,
      selectedProject2,
      selectedProject3,
      selectedProject4,
      selectedProject5,
      selectedProject6,
      selectedProject7,
      selectedProject8,
      selectedProject9
    );


    axios
      .post("api/teams", {
        members: user.user.id,
        is_public: isPublic,
        team_project_preferences: preferences,
        team_password: password,
      })
      .then((response) => {
        toast.success(
          "Team Creation Successful!"
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // projects

  var selectedProject1 = null;
  const handleProject1 = (e) => {
    selectedProject1 = e.value;
  };

  var selectedProject2 = null;
  const handleProject2 = (e) => {
    selectedProject2 = e.value;
  };

  var selectedProject3 = null;
  const handleProject3 = (e) => {
    selectedProject3 = e.value;
  };
  var selectedProject4 = null;
  const handleProject4 = (e) => {
    selectedProject4 = e.value;
  };
  var selectedProject5 = null;
  const handleProject5 = (e) => {
    selectedProject5 = e.value;
  };
  var selectedProject6 = null;
  const handleProject6 = (e) => {
    selectedProject6 = e.value;
  };
  var selectedProject7 = null;
  const handleProject7 = (e) => {
    selectedProject7 = e.value;
  };

  var selectedProject8 = null;
  const handleProject8 = (e) => {
    selectedProject8 = e.value;
  };

  var selectedProject9 = null;
  const handleProject9 = (e) => {
    selectedProject9 = e.value;
  };

  var password = null;
  const handlePassword = (e) => {
    password = e.target.value;
  };

  const handleProjectName = (index) => {
    if (user.user.project_details[index] === null) return "Select...";
    else return user.user.project_details[index].name;
  };
  useEffect(() => {
    axios
      .get(`/api/teams`)
      .then((response) => {
        setTeamNum(Object.keys(response.data).length + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-offWhite">
      <Navbar />
      <ToastContainer toastClassName="bg-green-500 text-white font-medium" />
      <div className="flex flex-col">
        <div className="basis-5/6 px-4">
          <h1 className="text-4xl text-center font-bold text-orange py-4">
            Team {teamNumber}
          </h1>
          <div className="flex flex-col shadow sm:rounded-md">
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
                              className="h-4 w-4 border-gray-300"
                              onClick={() => setIsPublic(false)}
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
                              className="h-4 w-4 border-gray-300"
                              onClick={() => setIsPublic(true)}
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
                      {!isPublic && (
                        <div
                          div
                          className="col-span-6 sm:col-span-6 lg:col-span-2"
                        >
                          <label
                            for="Team Password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Team Password
                          </label>
                          <input
                            type="password"
                            name="Team Password"
                            id="team_password"
                            className="py-2 px-3 mt-4 block w-half rounded-md border shadow-sm sm:text-sm "
                            onChange={handlePassword}
                          />
                        </div>
                      )}
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
                  <Select
                    options={projectOptions}
                    onChange={handleProject1}
                    defaultValue={{
                      label: handleProjectName(0),
                      value: handleProjectName(0),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 2</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject2}
                    defaultValue={{
                      label: handleProjectName(1),
                      value: handleProjectName(1),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 3</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject3}
                    defaultValue={{
                      label: handleProjectName(2),
                      value: handleProjectName(2),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 4</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject4}
                    defaultValue={{
                      label: handleProjectName(3),
                      value: handleProjectName(3),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 5</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject5}
                    defaultValue={{
                      label: handleProjectName(4),
                      value: handleProjectName(4),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 6</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject6}
                    defaultValue={{
                      label: handleProjectName(5),
                      value: handleProjectName(5),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 7</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject7}
                    defaultValue={{
                      label: handleProjectName(6),
                      value: handleProjectName(6),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>
              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 8</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject8}
                    defaultValue={{
                      label: handleProjectName(7),
                      value: handleProjectName(7),
                    }}
                    className=" py-2 w-full"
                  />
                </form>
              </div>

              <div className="w-1/3 mx-2 py-5">
                <form>
                  <label htmlFor="input3">Choice 9</label>
                  <Select
                    options={projectOptions}
                    onChange={handleProject9}
                    defaultValue={{
                      label: handleProjectName(8),
                      value: handleProjectName(8),
                    }}
                    className=" py-2 w-full"
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

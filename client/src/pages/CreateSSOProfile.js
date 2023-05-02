import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../components/User";
import { parse_attributes } from '../sso_helper.js'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const project_names = [];
const objs = [];
const projectOptions = [];

// get project list
axios
    .get("http://localhost:8082/api/projects/")
    .then((response) => {
        const project_objects = new Array(response.data);

        for (var i = 0; i < project_objects[0].length; i++) {
            // array of project objects
            objs.push(project_objects[0][i]);
        }
        objs.forEach((object) => {
            // array of project names
            project_names.push(object["name"]);
        });

        for (var i = 0; i < project_names.length; i++) {
            // used for drop down
            projectOptions.push({ value: objs[i], label: project_names[i] });
        }
    })
    .catch((error) => {
        console.log(error);
    });

export default function CreateProfile() {
    let navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
    const [attributes, setAttributes] = useState(['', '', '']);

    // Check whether the user has already signed in with SSO
    if (attributes[0] === '') {
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
                    setAttributes(attributes)
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function handleSubmit() {
        const perferences = new Array(
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
            .post("http://localhost:8082/api/register", {
                project_preferences: perferences,
                email: attributes[2],
                first_name: attributes[0],
                last_name: attributes[1],
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                zip: document.getElementById("zip").value,
                password: "SSO",
                skills: selectedOptions,
                extra_information: document.getElementById("additional").value,
            })
            .then((response) => {
                toast.success(
                    "Sign-up successful. Welcome " +
                    attributes[0] +
                    "!"
                );
                console.log(response)
                setUser({
                    ...user,
                    token: response.data.token,
                    id: response.data._id,
                    logged_in: true,
                });
                navigate("/status");
            })
            .catch((error) => {
                toast.error("Please enter try again!");
            });
    }

    //skills
    const skills = [
        { value: 1, label: "Java" },
        { value: 2, label: "C/C++" },
        { value: 3, label: "Python" },
        { value: 4, label: "React" },
        { value: 5, label: "MongoDB" },
        { value: 6, label: "Angular" },
        { value: 7, label: "Agile Methodologies" },
        { value: 8, label: "AI/ML" },
        { value: 9, label: "Git" },
        { value: 10, label: "Javascript" },
    ];

    const [selectedOptions, setSelectedOptions] = useState(null);

    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((skill) => skill.label) : []);
    };

    // handle projects

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

    return (
        <div className="bg-offWhite h-screen">
            <Navbar />

            <h1 className="text-4xl font-bold text-orange px-4 py-4">
                {'Hi ' + attributes[0] + '! Finish completing your profile.'}
            </h1>

            <ToastContainer toastClassName="bg-green-500 text-white font-medium" />

            <div className="flex justify-between w-full px-5">
                <div className="w-3/4 mx-2 py-5">
                    <form>
                        <label htmlFor="input3">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="border rounded py-2 px-3 w-full"
                        />
                    </form>
                </div>
                <div className="w-1/4 mx-2 px-12 py-5">
                    <form>
                        <label htmlFor="input3">City</label>
                        <input
                            type="text"
                            id="city"
                            className="border rounded py-2 px-3 w-full"
                        />
                    </form>
                </div>
                <div className="w-1/4 mx-2 px-12 py-5">
                    <form>
                        <label htmlFor="input3">Zip</label>
                        <input
                            type="text"
                            id="zip"
                            className="border rounded py-2 px-3 w-full"
                        />
                    </form>
                </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
                <div className="w-1/2 mx-2 py-5">
                    <label htmlFor="skills">Skills</label>
                    <Select options={skills} onChange={setHandle} isMulti />

                </div>
            </div>

            <h1 className="text-4xl font-bold text-orange px-4 py-4">
                Top 9 Project Choices
            </h1>

            <div className="bg-offWhite flex justify-between w-full px-5">
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 1 </label>
                    <Select options={projectOptions} onChange={handleProject1} />
                </div>
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 2 </label>
                    <Select options={projectOptions} onChange={handleProject2} />
                </div>

                <div className="w-1/3 mx-2 py-5">
                    <label> Project 3 </label>
                    <Select options={projectOptions} onChange={handleProject3} />
                </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 4 </label>
                    <Select options={projectOptions} onChange={handleProject4} />
                </div>
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 5 </label>
                    <Select options={projectOptions} onChange={handleProject5} />
                </div>

                <div className="w-1/3 mx-2 py-5">
                    <label> Project 6 </label>
                    <Select options={projectOptions} onChange={handleProject6} />
                </div>
            </div>

            <div className="bg-offWhite flex justify-between w-full px-5">
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 7 </label>
                    <Select options={projectOptions} onChange={handleProject7} />
                </div>
                <div className="w-1/3 mx-2 py-5">
                    <label> Project 8 </label>
                    <Select options={projectOptions} onChange={handleProject8} />
                </div>

                <div className="w-1/3 mx-2 py-5">
                    <label> Project 9 </label>
                    <Select options={projectOptions} onChange={handleProject9} />
                </div>
            </div>
            <div className="bg-offWhite flex justify-between w-full px-5">
                <div className="w-1/2 mx-2 py-5">
                    <form>
                        <label htmlFor="input3">Additional Info</label>
                        <input
                            type="text"
                            id="additional"
                            className="border rounded py-2 px-3 w-full"
                        />
                    </form>
                </div>
            </div>

            <div className="bg-offWhite flex justify-end px-10 py-10">
                <button
                    className="bg-green text-white px-10 py-2 rounded-md"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

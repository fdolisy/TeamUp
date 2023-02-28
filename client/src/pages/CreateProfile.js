import Navbar from "../components/Navbar";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";

export default function Starting() {
  function handleSubmit() {
    var choice1 = document.getElementById("c1").value;
    var choice2 = document.getElementById("c2").value;
    var choice3 = document.getElementById("c3").value;
    var choice4 = document.getElementById("c4").value;
    var choice5 = document.getElementById("c5").value;
    var choice6 = document.getElementById("c6").value;
    var choice7 = document.getElementById("c7").value;
    var choice8 = document.getElementById("c8").value;
    var choice9 = document.getElementById("c9").value;

    const perferences = new Array(
      choice1,
      choice2,
      choice3,
      choice4,
      choice5,
      choice6,
      choice7,
      choice8,
      choice9
    );

    axios
      .post("http://localhost:8082/api/users", {
        project_preferences: perferences,
        email: document.getElementById("email").value,
        first_name: document.getElementById("first").value,
        last_name: document.getElementById("last").value,
        address: document.getElementById("address").value,
        password: document.getElementById("password").value,
        skills: selectedOptions,
        extra_information: document.getElementById("additional").value,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <h1 className="text-4xl text-center font-bold text-orange py-4">
        Greetings!
      </h1>

      <div className="flex justify-between w-full px-5">
        <div className="w-1/2 mx-2 px-12">
          <form>
            <label htmlFor="input3">Email</label>
            <input
              type="text"
              id="email"
              className="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
        <div className="w-1/2 mx-2 px-12">
          <form>
            <label htmlFor="input3">Password</label>
            <input
              type="password"
              id="password"
              className="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
      </div>

      <div className="flex justify-between w-full px-5">
        <div className="w-1/3 mx-2 py-5">
          <form>
            <label htmlFor="input3">First Name</label>
            <input
              type="text"
              id="first"
              className="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
        <div className="w-1/3 mx-2 py-5">
          <form>
            <label htmlFor="input3">Last Name</label>
            <input
              type="text"
              id="last"
              className="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>

        <div className="w-1/3 mx-2 py-5">
          <form>
            <label htmlFor="input3">Address</label>
            <input
              type="text"
              id="address"
              className="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
      </div>

      <div className="flex justify-between w-full py-5 px-5">
        <label htmlFor="skills">Skills</label>
        <div className="w-full flex flex-wrap items-center lg:justify-between justify-center">
          <div className="w-full mt-8 ">
            <Select options={skills} onChange={setHandle} isMulti />
          </div>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-orange px-4 py-4">
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

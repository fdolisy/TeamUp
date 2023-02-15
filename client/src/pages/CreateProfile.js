import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from 'react';
import Select from "react-select";



export default function Starting() {
  let navigate = useNavigate();
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  }

  const handleDrop = (e, index) => {
    const startIndex = e.dataTransfer.getData("index");
    const newOrder = [...order];
    newOrder.splice(index, 0, newOrder.splice(startIndex, 1)[0]);
    setOrder(newOrder);
    console.log(newOrder)
  }

  function handleSubmit() {

  }

  const skills = [
    { value: 1, label: "Java" },
    { value: 2, label: "C/C++" },
    { value: 3, label: "Python" },
    { value: 4, label: "React" },
    { value: 5, label: "MongoDB" },
  ];

  const [selectedOptions, setSelectedOptions] = useState(null);

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((skill) => skill.label) : []);
  };



  function createTeam() {
    navigate("/create");
  }

  function joinTeam() {
    navigate("/join");
  }

  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div class="flex justify-between w-full py-5 px-5">
        <div class="w-1/3 mx-2">
          <form>
            <label for="input1">First Name</label>
            <input
              type="text"
              id="input1"
              name="input1"
              class="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
        <div class="w-1/3 mx-2">
          <form>
            <label for="input2">Last Name</label>
            <input
              type="text"
              id="input2"
              name="input2"
              class="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>

        <div class="w-1/3 mx-2">
          <form>
            <label for="input3">Address</label>
            <input
              type="text"
              id="input3"
              name="input3"
              class="border rounded py-2 px-3 w-full"
            />
          </form>
        </div>
      </div>


    <div className="flex justify-between w-full py-5 px-5">
        <label for="skills">Skills</label>
      <div className="w-full flex flex-wrap items-center lg:justify-between justify-center">
        <div className="w-full mt-8 ">
          <Select options={skills} onChange={setHandle} isMulti />
        </div>
        
      </div>
    </div>

    <div>{selectedOptions}</div>


    <div className="flex flex-wrap justify-center items-center w-screen">
      {order.map((number, index) => (
        <button
          key={index}
          className="bg-green hover:bg-blue-700 text-white font-bold py-4 px-8 rounded cursor-move m-2"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => e.preventDefault()}
        >
          {number}
        </button>
      ))}
    </div>


    <div className="flex justify-end px-10 py-10">
  <button className="bg-green text-white px-10 py-2 rounded-md">Submit</button>
</div>




     
</div>


  );
}

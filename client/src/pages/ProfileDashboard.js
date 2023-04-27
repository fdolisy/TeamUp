import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../components/User";
var names = [];

export default function ProfileDashboard() {
  const { user } = useContext(UserContext);
  console.log(user);
  for (var i = 0; i < user.project_details.length; i++) {
    if (user.project_details[i] === null) continue;
    else {
      names[i] = user.project_details[i].name;
    }
  }
  console.log(names);
  return (
    <div className="bg-offWhite h-screen">
      <Navbar />

      <div className="bg-offWhite h-screen text-green py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            {user.first_name} {user.last_name}
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold mb-4">Email:</p>
              <p className="text-xl">{user.email}</p>
              <div className="py-10">
                <p className="text-2xl font-bold mb-4">Address:</p>
                <p className="text-xl">
                  {user.address} {user.city} {user.zip}
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold mb-4">Skills:</p>
                <ul>
                  {user.skills.map((skill) => (
                    <li className="text-xl" key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">Top 9 Projects:</p>
              <ul>
                {names.map((project, index) => (
                  <li className="text-xl" key={index}>
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

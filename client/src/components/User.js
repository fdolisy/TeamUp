import { createContext } from "react";

export const initialUserData = {
  id: "",
  token: "",
  logged_in: false,
  first_name: "",
  last_name: "",
  email: "",
  skills: [],
  project_details: [],
  team_id: "",
  address: "",
  city: "",
  zip: "",
  extra_information: "",
};

export function reducer(state, userData) {
  return {
    ...state,
    id: userData.id,
    logged_in: userData.logged_in,
    token: userData.token,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    project_details: userData.project_details,
    skills: userData.skills,
    team_id: userData.team_id,
    address: userData.address,
    city: userData.city,
    zip: userData.zip,
    extra_information: userData.extra_information,
  };
}

export const UserContext = createContext();
export default UserContext;

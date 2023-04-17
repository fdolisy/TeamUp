import { createContext } from "react";

export const initialUserData = {
  id: "",
  token: "",
  logged_in: false,
  first_name: "",
  last_name: "",
  email: "",
  project_pref: [],
  skills: [],
  team_id: "",
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
    project_pref: userData.project_pref,
    skills: userData.skills,
    team_id: userData.team_id,
  };
}

export const UserContext = createContext();
export default UserContext;

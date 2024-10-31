import axios from "axios";
import { User } from "../constants/User";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  validateStatus: (status) => {
    return status >= 200 && status <= 403; // Accepts 200-402
  },
});

export const loginUserHandler = (data: User) => {
  return api.post("/login", data);
};
export const registerUserHandler = (user: User) => {
    const { userFname, userLname, ...otherUserData }= user;
    const userData = {
      userName: `${userFname} ${userLname}`,
      ...otherUserData,
    };
  return api.post("/register", userData);
};

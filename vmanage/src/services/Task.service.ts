import axios from "axios";
import { Task } from "../constants/Task";

const api = axios.create({
  baseURL: "http://localhost:3000/api/task",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = (userId: string) => { //http://localhost:3000/api/task/:userId
  return api.get(`/${userId}`);
};

export const createTask = (task: Task, userId: string) => { //http://localhost:3000/api/task/
  const payload = {
    ...task,
    taskInprogress: true,
    userId,
  };
  return api.post("/", payload);
};

export const markAsCompleteTask = (taskId: string, status: boolean, uid: string) => { //http://localhost:3000/api/task/:taskId/complete
  return api.put(`/${taskId}/complete`, {
    taskInprogress: status,
    userId: uid,
  });
};

export const editTask = (taskId: string, task: Task, uid: string) => {//http://localhost:3000/api/task/:taskId
  return api.put(`/${taskId}`, {task, userId: uid});
};

export const deleteTask = (taskId: string, uid: string) => {//http://localhost:3000/api/task/:taskId/:userId
  return api.delete(`/${taskId}/${uid}`);
};



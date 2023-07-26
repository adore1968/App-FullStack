import axios from "./axios";

export const getTasksRequest = () => axios("/tasks");

export const getTaskRequest = (id) => axios(`/tasks/${id}`);

export const createTaskRequest = (task) => axios.post("/tasks", task);

export const updateTaskRequest = (id, newTask) =>
  axios.put(`/tasks/${id}`, newTask);

export const deleteTaskRequest = (_id) => axios.delete(`/tasks/${_id}`);

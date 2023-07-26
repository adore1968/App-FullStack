import axios from "./axios";

export const registerUserRequest = (user) => axios.post("/auth/register", user);

export const loginUserRequest = (user) => axios.post("/auth/login", user);

export const logoutUserRequest = () => axios.post("/auth/logout");

export const verifyRequest = () => axios.post("/auth/verify");

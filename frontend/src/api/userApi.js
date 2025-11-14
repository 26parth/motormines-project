// src/api/userApi.js
import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000/users",
  withCredentials: true, // ✅ cookies send karega
});

export default userApi;

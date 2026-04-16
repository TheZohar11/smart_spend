import axios from "axios";
// import secure /storage file

const api = axios.create({
  baseURL: "https/localhost",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - inject access token

// Response Interceptor

export default api;

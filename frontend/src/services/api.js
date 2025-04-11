import axios from "axios";

// Create an axios instance with default settings
// This instance can be used to make requests to the backend API
// without needing to specify the base URL and headers each time
const api = axios.create({
  baseURL: "http://localhost:5000/", // update if your server uses a different port
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to requests
// This interceptor will run before each request is sent
// It checks if a token is stored in local storage and adds it to the request headers if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

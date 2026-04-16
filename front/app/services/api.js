import axios from "axios";
import {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
} from "./secureStorage";

const BASE_URL = "http://10.0.2.2:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    try {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await getRefreshToken();
        const res = await axios.post(`${BASE_URL}/users/token`, {
          token: refreshToken,
        });
        if (res.status === 200) {
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          await saveTokens(accessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      }
    } catch (e) {
      await clearTokens();
      return Promise.reject(e);
    }
    return Promise.reject(error);
  },
);

export default api;

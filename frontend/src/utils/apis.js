import axios from "axios";

const API_URL = "http://localhost:3000";

export const register = (userData) => {
  return axios.post(`${API_URL}/signup`, userData, {
    withCredentials: true,
  });
};

export const login = (loginData) => {
  return axios.post(`${API_URL}/login`, loginData, { withCredentials: true });
};

export const logOutUser = () => {
  return axios.get(`${API_URL}/logout`, { withCredentials: true });
};

export const updateProfile = (updates) => {
  return axios.patch(`${API_URL}/user`, updates, {
    withCredentials: true,
  });
};
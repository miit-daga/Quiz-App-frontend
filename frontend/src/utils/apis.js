import axios from "axios";

const API_URL = "http://localhost:3001";
axios.defaults.withCredentials = true;

export const register = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = (loginData) => {
  return axios.post(`${API_URL}/login`, loginData, { withCredentials: true });
};

export const logOutUser = () => {
  return axios.get(`${API_URL}/logout`, { withCredentials: true });
};

export const updateProfile = (updates) => {
  return axios.patch(`${API_URL}/user`, updates);
};
// New functions for quiz app
export const getQuizQuestions = () => {
  return axios.get(`${API_URL}/quiz/questions`, { withCredentials: true });
};

export const submitQuizAnswers = (answers) => {
  return axios.post(`${API_URL}/quiz/submit`, answers);
};
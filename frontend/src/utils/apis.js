import axios from "axios";

const API_URL = "https://quiz-app-backend-5ua4.onrender.com";
axios.defaults.withCredentials = true;

export const register = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = (loginData) => {
  return axios.post(`${API_URL}/login`, loginData);
};

export const logOutUser = () => {
  return axios.get(`${API_URL}/logout`);
};

export const updateProfile = (updates) => {
  return axios.patch(`${API_URL}/user`, updates);
};
// New functions for quiz app
export const getQuizQuestions = () => {
  return axios.get(`${API_URL}/quiz/questions`);
};

export const submitQuizAnswers = (answers) => {
  return axios.post(`${API_URL}/quiz/submit`, answers);
};

export const addQuizQuestion = (questionData) => {
  return axios.post(`${API_URL}/quiz/questions`, questionData);
};
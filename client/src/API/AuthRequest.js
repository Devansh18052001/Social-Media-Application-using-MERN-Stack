import axios from "axios";
// Base Url for API
const API = axios.create({baseURL: "http://localhost:5000"})
// API requesst for login form data to store->redux->action
export const logIn = (formData) => API.post('/auth/login',formData)
// API requesst for sign up form data to store->redux->action
export const signUp = (formData) => API.post('/auth/register',formData)
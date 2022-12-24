import axios from "axios";
// Base Url for API
const API = axios.create({baseURL: "http://localhost:5000"})
// API request for fetching Posts data from store->redux->action
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
// API request for liked post or not from store->redux->action
export const likePost = (id, userId) => API.put(`/post/${id}/like`, {userId: userId});

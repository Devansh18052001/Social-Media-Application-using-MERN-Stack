import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

// Make authorization header
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      // Makes string array of 2 elements 
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUser = () => API.get('/user');

export const followUser = (id, data) => {
  console.log("follow => ", data); 
  API.put(`/user/${id}/follow`, data);
  API.post('/chat/', {
    senderId: data._id,
    // receiverId: data?.following[following.length-1]
  });
}

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`,data);
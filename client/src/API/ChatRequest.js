import axios from 'axios'

// When userchat is runs it call baseURL then it will get http route of '/chat' with parameter id 
const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);
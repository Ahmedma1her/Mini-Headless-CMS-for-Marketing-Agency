import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export const loginUser = (credentials) =>
  api.post('/users/login', credentials);

export const registerUser = (data) =>
  api.post('/users/register', data);

export const getAllPosts = () =>
  api.get('/posts/all');

export const createPost = (formData) =>
  api.post('/posts', formData);

export const updatePost = (id, formData) =>
  api.put(`/posts/${id}`, formData);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);

export default api;

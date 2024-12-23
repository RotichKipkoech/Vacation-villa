// src/api/axios.js

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default apiClient;
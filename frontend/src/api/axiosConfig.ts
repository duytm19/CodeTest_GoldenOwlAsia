// src/api/axiosConfig.ts
import axios from 'axios';

// Sử dụng biến môi trường để dễ dàng thay đổi URL khi deploy
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;
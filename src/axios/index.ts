import axios from 'axios';

const baseURL = process.env.GATEWAY_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*'
  }
});

export default axiosInstance;

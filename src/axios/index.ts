import axios from 'axios';
import { ENDPOINTS } from '../consts';

const axiosInstance = axios.create({
  baseURL: ENDPOINTS.GATEWAY,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*'
  }
});

export default axiosInstance;

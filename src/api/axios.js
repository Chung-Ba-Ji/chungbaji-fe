import axios from 'axios';

const url = import.meta.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 로컬 스토리지에 토큰이 있다면 모든 요청 헤더에 자동으로 포함
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
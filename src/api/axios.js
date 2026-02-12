import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러(Unauthorized) 발생 시 로그아웃 처리
    if (error.response?.status === 401) {
      console.warn("인증이 만료되었습니다. 다시 로그인해주세요.");
    }
    return Promise.reject(error);
  }
);

export default instance;
/**
 * Axios 인스턴스 설정
 * API 요청을 위한 기본 설정 및 인터셉터
 */

import axios from 'axios';

// 기본 API URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: JWT 토큰 자동 추가 (로그인 기능 비활성화)
axiosInstance.interceptors.request.use(
  (config) => {
    // 인증 없이 API 호출 가능
    console.log('API 요청:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버 응답이 있는 경우
      const { status, data } = error.response;
      
      console.error('API 에러:', status, data);
      
      // 401 Unauthorized - 토큰 만료 또는 인증 실패 (로그인 기능 비활성화)
      if (status === 401) {
        console.warn('인증 실패 - 인증 없이 계속 진행');
      }
      
      // 403 Forbidden - 권한 없음
      if (status === 403) {
        console.error('접근 권한이 없습니다');
      }
      
      // 에러 메시지 추출
      const errorMessage = data?.message || '요청 처리 중 오류가 발생했습니다.';
      error.customMessage = errorMessage;
      
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error('서버 응답 없음:', error.request);
      error.customMessage = '서버와의 연결이 원활하지 않습니다.';
      
    } else {
      // 요청 설정 중 에러 발생
      console.error('요청 설정 에러:', error.message);
      error.customMessage = error.message;
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;



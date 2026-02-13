import instance from './axios';

// 필터 기반 정책 검색
export const fetchSearchPolicies = async (filterParams) => {
  // 백엔드 PolicySearchDTO 필드명에 맞춰서 데이터 전송
  const response = await instance.get('/api/policies/search', { params: filterParams });
  return response.data;
};

// 로그인 유저 맞춤형 정책 추천
export const fetchRecommendPolicies = async () => {
  // 인터셉터에서 토큰을 자동으로 넣어주므로 별도 인자 필요 없음
  const response = await instance.get('/api/policies/recommend');
  return response.data;
};

// 3. 북마크 등록/해제
export const toggleBookmarkApi = async (policyId) => {
  const response = await instance.post(`/api/bookmarks/toggle`, { policyId });
  return response.data;
};
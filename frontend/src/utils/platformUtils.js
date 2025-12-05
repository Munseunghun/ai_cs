/**
 * 플랫폼 유틸리티 함수
 * 관리자 기능에서 추가한 플랫폼 목록을 관리
 */

// 로컬 스토리지 키
const STORAGE_KEY_PLATFORMS = 'admin_platforms';

// 기본 플랫폼 목록 (하드코딩된 기본값)
const DEFAULT_PLATFORMS = [
  { id: 'NAVER', code: 'NAVER', name: '네이버', url: 'https://shoppinglive.naver.com', isActive: true },
  { id: 'KAKAO', code: 'KAKAO', name: '카카오', url: 'https://shoppinglive.kakao.com', isActive: true },
  { id: '11ST', code: '11ST', name: '11번가', url: 'https://m.11st.co.kr/page/main/live11', isActive: true },
  { id: 'GMARKET', code: 'GMARKET', name: 'G마켓', url: 'https://m.gmarket.co.kr/n/live/schedule', isActive: true },
  { id: 'OLIVEYOUNG', code: 'OLIVEYOUNG', name: '올리브영', url: 'https://m.oliveyoung.co.kr/m/mtn/explorer?menu=live', isActive: true },
  { id: 'GRIP', code: 'GRIP', name: '그립', url: 'https://www.grip.show/discover/category', isActive: true },
  { id: 'MUSINSA', code: 'MUSINSA', name: '무신사', url: 'https://www.musinsa.com/campaign/musinsa_live/0', isActive: true },
  { id: 'LOTTEON', code: 'LOTTEON', name: '롯데온', url: 'https://www.lotteon.com/display/planV2/planDetail', isActive: true },
  { id: 'AMOREMALL', code: 'AMOREMALL', name: '아모레몰', url: 'https://www.amoremall.com/kr/ko/display/live', isActive: true },
  { id: 'INNISFREE_MALL', code: 'INNISFREE_MALL', name: '이니스프리몰', url: 'https://www.innisfree.com/kr/ko/display/live', isActive: true },
];

/**
 * 플랫폼 목록 가져오기 (로컬 스토리지에서)
 * @returns {Array} 플랫폼 목록
 */
export const getPlatforms = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PLATFORMS);
    if (saved) {
      const platforms = JSON.parse(saved);
      // 활성화된 플랫폼만 반환
      return platforms.filter(p => p.isActive !== false);
    }
  } catch (e) {
    console.error('플랫폼 목록 로드 실패:', e);
  }
  // 기본값 반환
  return DEFAULT_PLATFORMS.filter(p => p.isActive !== false);
};

/**
 * 플랫폼 코드로 플랫폼 정보 찾기
 * @param {string} code - 플랫폼 코드
 * @returns {Object|null} 플랫폼 정보
 */
export const getPlatformByCode = (code) => {
  const platforms = getPlatforms();
  return platforms.find(p => p.code === code || p.id === code) || null;
};

/**
 * 플랫폼 코드로 플랫폼 이름 가져오기
 * @param {string} code - 플랫폼 코드
 * @returns {string} 플랫폼 이름
 */
export const getPlatformName = (code) => {
  const platform = getPlatformByCode(code);
  return platform ? platform.name : code;
};

/**
 * 플랫폼 필터 옵션 생성 (Select 컴포넌트용)
 * @returns {Array} MenuItem용 옵션 배열
 */
export const getPlatformFilterOptions = () => {
  const platforms = getPlatforms();
  return platforms.map(p => ({
    value: p.code,
    label: p.name,
  }));
};

/**
 * 이벤트의 플랫폼 코드를 플랫폼 이름으로 변환
 * @param {Object} event - 이벤트 객체
 * @returns {string} 플랫폼 이름
 */
export const getEventPlatformName = (event) => {
  if (event.channel_name) {
    return event.channel_name;
  }
  if (event.channel_code) {
    return getPlatformName(event.channel_code);
  }
  if (event.platform_name) {
    return event.platform_name;
  }
  return '기타';
};

/**
 * 플랫폼 코드 매핑 (다양한 형식 지원)
 * @param {string} code - 플랫폼 코드
 * @returns {string} 표준화된 플랫폼 코드
 */
export const normalizePlatformCode = (code) => {
  if (!code) return '';
  
  const codeUpper = code.toUpperCase();
  
  // 플랫폼 코드 매핑
  const codeMap = {
    'INNISFREE_MALL': 'INNISFREE_MALL',
    'INNISFREE': 'INNISFREE_MALL',
    '이니스프리몰': 'INNISFREE_MALL',
    '이니스프리': 'INNISFREE_MALL',
  };
  
  return codeMap[codeUpper] || codeUpper;
};


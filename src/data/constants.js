// 지역 목록
export const REGIONS = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주'
];

// 전문 분야
export const SPECIALTIES = [
  { id: 'food', name: '맛집/음식', emoji: '🍔' },
  { id: 'cafe', name: '카페/디저트', emoji: '☕' },
  { id: 'travel', name: '여행/숙박', emoji: '✈️' },
  { id: 'beauty', name: '뷰티/화장품', emoji: '💄' },
  { id: 'fashion', name: '패션/의류', emoji: '👗' },
  { id: 'interior', name: '인테리어/가구', emoji: '🏠' },
  { id: 'digital', name: '디지털/가전', emoji: '📱' },
  { id: 'life', name: '생활/육아', emoji: '🧸' },
  { id: 'health', name: '헬스/운동', emoji: '💪' },
  { id: 'pet', name: '반려동물', emoji: '🐕' },
  { id: 'hobby', name: '취미/여가', emoji: '🎨' },
  { id: 'education', name: '교육/학원', emoji: '📚' },
  { id: 'finance', name: '금융/재테크', emoji: '💰' },
  { id: 'car', name: '자동차', emoji: '🚗' },
  { id: 'culture', name: '문화/공연', emoji: '🎭' },
  { id: 'etc', name: '기타', emoji: '📝' }
];

// 글쓰기 스타일
export const WRITING_STYLES = [
  { id: 'informative', name: '정보성', emoji: '📊' },
  { id: 'review', name: '후기형', emoji: '⭐' },
  { id: 'story', name: '스토리텔링', emoji: '📖' },
  { id: 'casual', name: '일상 공유', emoji: '☕' },
  { id: 'professional', name: '전문적', emoji: '💼' },
  { id: 'emotional', name: '감성적', emoji: '💭' },
  { id: 'humorous', name: '유머러스', emoji: '😄' },
  { id: 'practical', name: '실용적', emoji: '🔧' },
  { id: 'comparative', name: '비교/분석', emoji: '📈' },
  { id: 'howto', name: '가이드형', emoji: '📝' }
];

// 배지 시스템
export const BADGES = [
  {
    id: 'diamond',
    name: '다이아몬드',
    class: 'badge-diamond',
    score: 90,
    emoji: '💎',
    description: '최상위 1% 블로거만 도달하는 최고 등급'
  },
  {
    id: 'platinum',
    name: '플래티넘',
    class: 'badge-platinum',
    score: 75,
    emoji: '🏆',
    description: '상위 5% 블로거의 전문성 인증'
  },
  {
    id: 'gold',
    name: '골드',
    class: 'badge-gold',
    score: 60,
    emoji: '🥇',
    description: '상위 15% 블로거의 신뢰도 보증'
  },
  {
    id: 'silver',
    name: '실버',
    class: 'badge-silver',
    score: 40,
    emoji: '🥈',
    description: '검증된 블로거의 기본 등급'
  }
];

// SNS 플랫폼
export const SNS_PLATFORMS = [
  { id: 'naver', name: '네이버 블로그', icon: 'N', color: 'green' },
  { id: 'tistory', name: '티스토리', icon: 'T', color: 'orange' },
  { id: 'instagram', name: '인스타그램', icon: '📷', color: 'pink' },
  { id: 'youtube', name: '유튜브', icon: '▶️', color: 'red' },
  { id: 'facebook', name: '페이스북', icon: 'f', color: 'blue' },
  { id: 'twitter', name: '트위터', icon: '🐦', color: 'sky' }
];

// 사업자 업종
export const BUSINESS_CATEGORIES = [
  '음식점',
  '카페/디저트',
  '숙박업',
  '뷰티/미용',
  '패션/의류',
  '유통/소매',
  '교육/학원',
  '헬스/피트니스',
  '병원/의료',
  '기타 서비스업'
];

// 핵심 지표 설명
export const METRICS = {
  roa: {
    title: 'ROA (Return on Ad-spend)',
    icon: '💰',
    description: '투자 대비 수익률',
    formula: '(발생 매출액) / (포스팅 비용)',
    example: 'ROA 300% = 10만원 투자로 30만원 매출 달성',
    color: 'from-green-400 to-emerald-600'
  },
  ccr: {
    title: 'CCR (Conversion Contributor Rate)',
    icon: '📊',
    description: '전환 기여율',
    formula: '(실제 예약/구매 건수) / (링크 클릭 수)',
    example: 'CCR 15% = 100명 클릭 중 15명이 실제 구매',
    color: 'from-blue-400 to-indigo-600'
  },
  masterScore: {
    title: '마스터 지수',
    icon: '⭐',
    description: '종합 신뢰 점수',
    formula: 'ROA + CCR + 만족도 종합 평가',
    example: '100점 만점 기준으로 블로거의 전문성 평가',
    color: 'from-blue-400 to-blue-700'
  }
};

// 프로세스 단계
export const PROCESS_STEPS = [
  { step: 1, title: '검색 및 필터링', desc: 'ROA 최상위 블로거 검색', icon: '🔍' },
  { step: 2, title: '섭외 요청', desc: '프로필 확인 후 섭외', icon: '📝' },
  { step: 3, title: '고유 링크 발행', desc: '성과 추적용 링크 발급', icon: '🔗' },
  { step: 4, title: '포스팅 & 모니터링', desc: '실시간 성과 대시보드', icon: '📈' },
  { step: 5, title: '검증 및 정산', desc: '에스크로 기반 안전 결제', icon: '✅' }
];

// 커뮤니티 카테고리
export const COMMUNITY_CATEGORIES = [
  { id: 'all', name: '전체', emoji: '📋' },
  { id: 'review', name: '체험 후기', emoji: '⭐' },
  { id: 'tips', name: '팁 & 노하우', emoji: '💡' },
  { id: 'qna', name: 'Q&A', emoji: '❓' },
  { id: 'recruit', name: '의뢰 모집', emoji: '📢' },
  { id: 'success', name: '성공 사례', emoji: '🎯' },
  { id: 'free', name: '자유 게시판', emoji: '💬' }
];

// 색상 테마
export const COLORS = {
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6'
};

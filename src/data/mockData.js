// 샘플 블로거 데이터
export const SAMPLE_BLOGGERS = [
  {
    id: 1,
    name: '김미식',
    avatar: '🍔',
    badge: 'diamond',
    roa: 425,
    ccr: 22.5,
    masterScore: 94,
    region: '서울',
    specialty: ['맛집/음식', '카페/디저트'],
    writingStyle: ['후기형', '스토리텔링', '정보성'],
    avgPrice: 300000,
    postCount: 342,
    successRate: 96.8,
    recentWork: '강남 파스타 맛집 리뷰',
    bio: '10년차 맛집 블로거입니다. 실제 매출 증대에 집중하는 진성 리뷰를 작성합니다.',
    followers: {
      naver: 45000,
      instagram: 32000
    }
  },
  {
    id: 2,
    name: '박여행',
    avatar: '✈️',
    badge: 'platinum',
    roa: 380,
    ccr: 19.2,
    masterScore: 88,
    region: '제주',
    specialty: ['여행/숙박', '맛집/음식'],
    writingStyle: ['스토리텔링', '감성적'],
    avgPrice: 250000,
    postCount: 218,
    successRate: 94.2,
    recentWork: '제주 숙소 체험단',
    bio: '제주 여행 전문 블로거. 감성적인 스토리텔링으로 높은 전환율을 자랑합니다.'
  },
  {
    id: 3,
    name: '이뷰티',
    avatar: '💄',
    badge: 'platinum',
    roa: 395,
    ccr: 21.8,
    masterScore: 86,
    region: '서울',
    specialty: ['뷰티/화장품', '패션/의류'],
    writingStyle: ['후기형', '비교/분석'],
    avgPrice: 280000,
    postCount: 156,
    successRate: 95.5,
    recentWork: '신상 파운데이션 비교 리뷰'
  },
  {
    id: 4,
    name: '최육아',
    avatar: '🧸',
    badge: 'gold',
    roa: 320,
    ccr: 17.3,
    masterScore: 78,
    region: '경기',
    specialty: ['생활/육아', '교육/학원'],
    writingStyle: ['일상 공유', '실용적'],
    avgPrice: 200000,
    postCount: 289,
    successRate: 92.1,
    recentWork: '아기 용품 추천'
  },
  {
    id: 5,
    name: '정헬스',
    avatar: '💪',
    badge: 'gold',
    roa: 340,
    ccr: 18.5,
    masterScore: 75,
    region: '부산',
    specialty: ['헬스/운동', '건강'],
    writingStyle: ['가이드형', '전문적'],
    avgPrice: 220000,
    postCount: 167,
    successRate: 93.4,
    recentWork: 'PT 센터 체험 후기'
  }
];

// 샘플 포트폴리오 데이터
export const SAMPLE_PORTFOLIO = [
  {
    id: 1,
    title: '강남 이탈리안 레스토랑 리뷰',
    description: '신선한 재료와 정통 이탈리안 요리로 유명한 레스토랑 체험',
    image: '🍝',
    date: '2024-10-15',
    roa: 420,
    ccr: 24.5,
    clicks: 3240,
    conversions: 794,
    revenue: 12600000,
    category: '맛집/음식',
    link: 'https://blog.naver.com/sample/123'
  },
  {
    id: 2,
    title: '제주 오션뷰 호텔 체험단',
    description: '환상적인 바다 전망과 완벽한 서비스의 프리미엄 호텔',
    image: '🏖️',
    date: '2024-09-22',
    roa: 385,
    ccr: 21.2,
    clicks: 2850,
    conversions: 604,
    revenue: 9625000,
    category: '여행/숙박',
    link: 'https://blog.naver.com/sample/124'
  },
  {
    id: 3,
    title: '신상 카페 디저트 맛집',
    description: '감성 넘치는 인테리어와 맛있는 디저트의 조화',
    image: '🍰',
    date: '2024-10-01',
    roa: 445,
    ccr: 26.8,
    clicks: 4120,
    conversions: 1104,
    revenue: 8900000,
    category: '카페/디저트',
    link: 'https://blog.naver.com/sample/125'
  }
];

// 샘플 섭외 요청 데이터
export const SAMPLE_REQUESTS = [
  {
    id: 1,
    businessName: '마르게리따 피자',
    businessType: '음식점',
    region: '서울',
    category: '맛집/음식',
    budget: 300000,
    description: '강남역 근처 정통 이탈리안 피자 레스토랑입니다. 신선한 재료와 정통 나폴리 피자를 선보입니다.',
    requestDate: '2024-11-01',
    status: 'pending',
    contactPerson: '김사장',
    contactPhone: '010-1234-5678'
  },
  {
    id: 2,
    businessName: '감성 카페 루나',
    businessType: '카페/디저트',
    region: '서울',
    category: '카페/디저트',
    budget: 250000,
    description: '홍대 근처 감성 넘치는 브런치 카페입니다. 인스타그램 감성의 디저트와 음료를 제공합니다.',
    requestDate: '2024-11-05',
    status: 'pending',
    contactPerson: '이대표',
    contactPhone: '010-2345-6789'
  }
];

// 샘플 커뮤니티 게시글 데이터
export const SAMPLE_POSTS = [
  {
    id: 1,
    title: '[팁] ROA 400% 달성한 제 노하우 공유합니다',
    category: 'tips',
    author: '김미식',
    authorBadge: 'diamond',
    date: '2024-11-10',
    views: 1245,
    likes: 89,
    comments: 23,
    isPinned: true,
    content: '안녕하세요! 다이아몬드 등급 블로거 김미식입니다. 오늘은 제가 ROA 400%를 달성한 노하우를 공유하려고 합니다...'
  },
  {
    id: 2,
    title: '[후기] 블로그 마스터즈 한 달 사용 후기',
    category: 'review',
    author: '박여행',
    authorBadge: 'platinum',
    date: '2024-11-09',
    views: 856,
    likes: 67,
    comments: 15,
    isPinned: false,
    content: '블로그 마스터즈를 사용한 지 한 달이 되었습니다. 확실히 기존 플랫폼과는 다른 점이 많네요...'
  },
  {
    id: 3,
    title: '[질문] CCR 올리는 방법 문의드립니다',
    category: 'qna',
    author: '신규블로거',
    authorBadge: 'silver',
    date: '2024-11-08',
    views: 432,
    likes: 12,
    comments: 8,
    isPinned: false,
    content: 'ROA는 괜찮은데 CCR이 낮게 나와서 고민입니다. 혹시 CCR 올리는 팁 있으실까요?'
  },
  {
    id: 4,
    title: '[성공사례] 첫 달 수익 500만원 돌파!',
    category: 'success',
    author: '이뷰티',
    authorBadge: 'platinum',
    date: '2024-11-07',
    views: 1893,
    likes: 156,
    comments: 34,
    isPinned: true,
    content: '믿기지 않지만 블로그 마스터즈 시작하고 첫 달에 500만원 수익을 달성했습니다!...'
  },
  {
    id: 5,
    title: '[모집] 부산 맛집 체험단 모집합니다',
    category: 'recruit',
    author: '부산맛집사장님',
    authorBadge: null,
    date: '2024-11-06',
    views: 634,
    likes: 28,
    comments: 19,
    isPinned: false,
    content: '부산 해운대 맛집입니다. 블로그 리뷰 작성해주실 분 모집합니다. 예산 30만원...'
  }
];

// 샘플 리뷰 데이터
export const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: '강남식당',
    businessType: '음식점',
    rating: 5,
    date: '2024-10-20',
    content: '김미식 블로거님과 협업했는데 정말 대만족입니다! 포스팅 후 일주일만에 예약이 3배 증가했어요. ROA도 450%가 나왔습니다.',
    roa: 450,
    verified: true
  },
  {
    id: 2,
    author: '제주리조트',
    businessType: '숙박업',
    rating: 5,
    date: '2024-09-25',
    content: '전문적이고 감성적인 글로 우리 리조트의 매력을 완벽하게 표현해주셨습니다. 예약 전환율이 20% 넘게 나왔어요!',
    roa: 380,
    verified: true
  },
  {
    id: 3,
    author: '홍대카페',
    businessType: '카페',
    rating: 5,
    date: '2024-10-05',
    content: '사진 실력도 좋으시고 글솜씨도 훌륭하세요. 덕분에 매출이 크게 올랐습니다. 재계약 의향 100%입니다!',
    roa: 445,
    verified: true
  }
];

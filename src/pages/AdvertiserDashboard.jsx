import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { SAMPLE_BLOGGERS } from '../data/mockData';
import { WRITING_STYLES, SPECIALTIES, REGIONS, BADGES } from '../data/constants';

const AdvertiserDashboard = () => {
  const navigate = useNavigate();
  const [bloggers, setBloggers] = useState(SAMPLE_BLOGGERS);
  const [filteredBloggers, setFilteredBloggers] = useState(SAMPLE_BLOGGERS);
  const [sortBy, setSortBy] = useState('roa'); // roa, ccr, score, price

  const [filters, setFilters] = useState({
    writingStyles: [],
    specialties: [],
    regions: [],
    badges: [],
    roaMin: 0,
    roaMax: 1000,
    ccrMin: 0,
    ccrMax: 100,
    priceMin: 0,
    priceMax: 1000000
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, searchKeyword]);

  const applyFilters = () => {
    let result = [...bloggers];

    // 검색어 필터
    if (searchKeyword) {
      result = result.filter(blogger =>
        blogger.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        blogger.specialty.some(s => s.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    // 글쓰기 스타일 필터
    if (filters.writingStyles.length > 0) {
      result = result.filter(blogger =>
        blogger.writingStyle.some(style => filters.writingStyles.includes(style))
      );
    }

    // 전문 분야 필터
    if (filters.specialties.length > 0) {
      result = result.filter(blogger =>
        blogger.specialty.some(spec => filters.specialties.includes(spec))
      );
    }

    // 지역 필터
    if (filters.regions.length > 0) {
      result = result.filter(blogger => filters.regions.includes(blogger.region));
    }

    // 배지 필터
    if (filters.badges.length > 0) {
      result = result.filter(blogger => filters.badges.includes(blogger.badge));
    }

    // ROA 필터
    result = result.filter(blogger =>
      blogger.roa >= filters.roaMin && blogger.roa <= filters.roaMax
    );

    // CCR 필터
    result = result.filter(blogger =>
      blogger.ccr >= filters.ccrMin && blogger.ccr <= filters.ccrMax
    );

    // 가격 필터
    result = result.filter(blogger =>
      blogger.avgPrice >= filters.priceMin && blogger.avgPrice <= filters.priceMax
    );

    // 정렬
    result.sort((a, b) => {
      switch (sortBy) {
        case 'roa':
          return b.roa - a.roa;
        case 'ccr':
          return b.ccr - a.ccr;
        case 'score':
          return b.masterScore - a.masterScore;
        case 'price':
          return a.avgPrice - b.avgPrice;
        default:
          return 0;
      }
    });

    setFilteredBloggers(result);
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const resetFilters = () => {
    setFilters({
      writingStyles: [],
      specialties: [],
      regions: [],
      badges: [],
      roaMin: 0,
      roaMax: 1000,
      ccrMin: 0,
      ccrMax: 100,
      priceMin: 0,
      priceMax: 1000000
    });
    setSearchKeyword('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">블로거 찾기</h1>
              <p className="text-gray-600 mt-1">성과로 검증된 전문 블로거를 찾아보세요</p>
            </div>
            <Link to="/logout">
              <Button variant="outline">로그아웃</Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="블로거 이름, 전문 분야로 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button onClick={() => applyFilters()}>
              🔍 검색
            </Button>
          </div>
        </Card>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0 space-y-4">
            {/* Sorting */}
            <Card>
              <h3 className="font-bold mb-3">정렬</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="roa">ROA 높은 순</option>
                <option value="ccr">CCR 높은 순</option>
                <option value="score">마스터 지수 순</option>
                <option value="price">가격 낮은 순</option>
              </select>
            </Card>

            {/* Badge Filter */}
            <Card>
              <h3 className="font-bold mb-3">마스터 등급</h3>
              <div className="space-y-2">
                {BADGES.map((badge) => (
                  <label key={badge.id} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.badges.includes(badge.id)}
                      onChange={() => toggleFilter('badges', badge.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 flex items-center gap-2">
                      <span>{badge.emoji}</span>
                      <span>{badge.name}</span>
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Writing Style Filter */}
            <Card>
              <h3 className="font-bold mb-3">글쓰기 스타일</h3>
              <div className="grid grid-cols-2 gap-2">
                {WRITING_STYLES.slice(0, 6).map((style) => (
                  <button
                    key={style.id}
                    onClick={() => toggleFilter('writingStyles', style.name)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      filters.writingStyles.includes(style.name)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{style.emoji}</span>
                    {style.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Specialty Filter */}
            <Card>
              <h3 className="font-bold mb-3">전문 분야</h3>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALTIES.slice(0, 8).map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => toggleFilter('specialties', specialty.name)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      filters.specialties.includes(specialty.name)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{specialty.emoji}</span>
                    {specialty.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Region Filter */}
            <Card>
              <h3 className="font-bold mb-3">지역</h3>
              <div className="grid grid-cols-2 gap-2">
                {REGIONS.slice(0, 8).map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleFilter('regions', region)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      filters.regions.includes(region)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </Card>

            {/* Reset Button */}
            <Button variant="outline" fullWidth onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>

          {/* Blogger List */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                <strong className="text-primary">{filteredBloggers.length}</strong>명의 블로거
              </p>
            </div>

            {filteredBloggers.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">😢</div>
                <p className="text-gray-600">검색 결과가 없습니다.</p>
                <Button onClick={resetFilters} className="mt-4">
                  필터 초기화
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredBloggers.map((blogger) => (
                  <Card key={blogger.id} hover className="cursor-pointer">
                    <div className="flex gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="text-6xl">{blogger.avatar}</div>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{blogger.name}</h3>
                              <Badge type={blogger.badge} size="sm" />
                            </div>
                            <p className="text-gray-600 text-sm">{blogger.bio || '전문 블로거입니다.'}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {(blogger.avgPrice / 10000).toLocaleString()}만원
                            </div>
                            <div className="text-sm text-gray-500">평균 단가</div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="bg-green-50 p-3 rounded-xl text-center">
                            <div className="text-xs text-gray-600 mb-1">ROA</div>
                            <div className="text-xl font-bold text-green-600">{blogger.roa}%</div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-xl text-center">
                            <div className="text-xs text-gray-600 mb-1">CCR</div>
                            <div className="text-xl font-bold text-blue-600">{blogger.ccr}%</div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-xl text-center">
                            <div className="text-xs text-gray-600 mb-1">지수</div>
                            <div className="text-xl font-bold text-yellow-600">{blogger.masterScore}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl text-center">
                            <div className="text-xs text-gray-600 mb-1">성공률</div>
                            <div className="text-xl font-bold text-gray-700">{blogger.successRate}%</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            📍 {blogger.region}
                          </span>
                          {blogger.specialty.slice(0, 2).map((spec, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                              {spec}
                            </span>
                          ))}
                          {blogger.writingStyle.slice(0, 2).map((style, idx) => (
                            <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                              {style}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => navigate(`/blogger-profile/${blogger.id}`)}
                            className="flex-1"
                          >
                            프로필 보기
                          </Button>
                          <Button variant="outline" className="flex-1">
                            섭외 요청
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;

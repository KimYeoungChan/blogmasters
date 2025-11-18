import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Modal from '../components/common/Modal';
import Tab from '../components/common/Tab';
import { SAMPLE_PORTFOLIO, SAMPLE_REQUESTS } from '../data/mockData';

const BloggerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [portfolio, setPortfolio] = useState(SAMPLE_PORTFOLIO);
  const [requests, setRequests] = useState(SAMPLE_REQUESTS);

  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    description: '',
    category: '',
    roa: '',
    ccr: '',
    clicks: '',
    conversions: '',
    revenue: '',
    link: ''
  });

  // 블로거 정보 (실제로는 로그인한 사용자 정보)
  const blogger = {
    name: '김미식',
    email: 'blogger@test.com',
    avatar: '🍔',
    badge: 'diamond',
    roa: 425,
    ccr: 22.5,
    masterScore: 94,
    totalEarnings: 12500000,
    monthlyEarnings: 3200000,
    activeProjects: 8,
    completedProjects: 342
  };

  const tabs = [
    { id: 'overview', label: '개요', icon: '📊' },
    { id: 'portfolio', label: '포트폴리오', icon: '📁' },
    { id: 'requests', label: '섭외 요청', icon: '📬' },
    { id: 'profile', label: '프로필 설정', icon: '⚙️' }
  ];

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    const portfolioItem = {
      id: Date.now(),
      ...newPortfolio,
      date: new Date().toISOString().split('T')[0],
      image: '📝'
    };
    setPortfolio([portfolioItem, ...portfolio]);
    setNewPortfolio({
      title: '',
      description: '',
      category: '',
      roa: '',
      ccr: '',
      clicks: '',
      conversions: '',
      revenue: '',
      link: ''
    });
    setShowPortfolioModal(false);
  };

  const handleRequestAction = (requestId, action) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: action } : req
    ));
    alert(`요청을 ${action === 'accepted' ? '수락' : '거절'}했습니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{blogger.avatar}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">{blogger.name}</h1>
                  <Badge type={blogger.badge} />
                </div>
                <p className="text-gray-600">{blogger.email}</p>
              </div>
            </div>
            <Link to="/logout">
              <Button variant="outline">로그아웃</Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card gradient="blue" hover>
                <div className="text-sm font-semibold text-gray-600 mb-2">평균 ROA</div>
                <div className="text-4xl font-bold text-primary mb-1">{blogger.roa}%</div>
                <div className="text-sm text-green-600">↑ 12% 지난달 대비</div>
              </Card>

              <Card gradient="green" hover>
                <div className="text-sm font-semibold text-gray-600 mb-2">평균 CCR</div>
                <div className="text-4xl font-bold text-green-600 mb-1">{blogger.ccr}%</div>
                <div className="text-sm text-green-600">↑ 5% 지난달 대비</div>
              </Card>

              <Card gradient="yellow" hover>
                <div className="text-sm font-semibold text-gray-600 mb-2">마스터 지수</div>
                <div className="text-4xl font-bold text-yellow-600 mb-1">{blogger.masterScore}</div>
                <div className="text-sm text-green-600">↑ 2점 지난달 대비</div>
              </Card>

              <Card gradient="pink" hover>
                <div className="text-sm font-semibold text-gray-600 mb-2">이번 달 수익</div>
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  {(blogger.monthlyEarnings / 10000).toFixed(0)}만원
                </div>
                <div className="text-sm text-green-600">↑ 18% 지난달 대비</div>
              </Card>
            </div>

            {/* Activity Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-bold mb-4">💰 수익 현황</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 누적 수익</span>
                    <span className="font-bold text-primary">
                      {(blogger.totalEarnings / 10000).toLocaleString()}만원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">이번 달 수익</span>
                    <span className="font-bold text-green-600">
                      {(blogger.monthlyEarnings / 10000).toLocaleString()}만원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">정산 예정 금액</span>
                    <span className="font-bold text-yellow-600">150만원</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold mb-4">📈 활동 내역</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">진행 중인 프로젝트</span>
                    <span className="font-bold text-blue-600">{blogger.activeProjects}건</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">완료된 프로젝트</span>
                    <span className="font-bold text-gray-700">{blogger.completedProjects}건</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">성공률</span>
                    <span className="font-bold text-green-600">96.8%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Requests */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">📬 최근 섭외 요청</h3>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  전체 보기 →
                </button>
              </div>
              <div className="space-y-3">
                {requests.slice(0, 3).map((request) => (
                  <div key={request.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{request.businessName}</h4>
                        <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-500">💰 {(request.budget / 10000).toLocaleString()}만원</span>
                          <span className="text-gray-500">📍 {request.region}</span>
                          <span className="text-gray-500">🏷️ {request.category}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status === 'pending' ? '대기중' :
                         request.status === 'accepted' ? '수락됨' : '거절됨'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">포트폴리오</h2>
              <Button onClick={() => setShowPortfolioModal(true)}>
                + 새 포트폴리오 추가
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.map((item) => (
                <Card key={item.id} hover>
                  <div className="text-5xl mb-3">{item.image}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-xl">
                      <div className="text-xs text-gray-600">ROA</div>
                      <div className="text-2xl font-bold text-green-600">{item.roa}%</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <div className="text-xs text-gray-600">CCR</div>
                      <div className="text-2xl font-bold text-blue-600">{item.ccr}%</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>👆 {item.clicks.toLocaleString()} 클릭</span>
                    <span>✅ {item.conversions} 전환</span>
                    <span>💰 {(item.revenue / 10000).toLocaleString()}만원</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{item.date}</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      포스팅 보기 →
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">섭외 요청</h2>

            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{request.businessName}</h3>
                          <span className="text-sm text-gray-500">{request.businessType} · {request.region}</span>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.status === 'pending' ? '대기중' :
                           request.status === 'accepted' ? '수락됨' : '거절됨'}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{request.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                          <div className="text-xs text-gray-600">제안 금액</div>
                          <div className="text-lg font-bold text-blue-600">
                            {(request.budget / 10000).toLocaleString()}만원
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl">
                          <div className="text-xs text-gray-600">카테고리</div>
                          <div className="text-sm font-semibold text-gray-700">{request.category}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl">
                          <div className="text-xs text-gray-600">담당자</div>
                          <div className="text-sm font-semibold text-gray-700">{request.contactPerson}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl">
                          <div className="text-xs text-gray-600">연락처</div>
                          <div className="text-sm font-semibold text-gray-700">{request.contactPhone}</div>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleRequestAction(request.id, 'accepted')}
                            className="flex-1"
                          >
                            수락
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            className="flex-1"
                          >
                            거절
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">프로필 설정</h2>

            <Card>
              <h3 className="text-xl font-bold mb-4">기본 정보</h3>
              <div className="space-y-4">
                <Input label="이름" value={blogger.name} readOnly />
                <Input label="이메일" value={blogger.email} readOnly />
                <div className="pt-4">
                  <Button variant="outline">비밀번호 변경</Button>
                </div>
              </div>
            </Card>

            <Card gradient="blue">
              <div className="text-center">
                <div className="text-6xl mb-4">{blogger.avatar}</div>
                <Badge type={blogger.badge} size="lg" />
                <h3 className="text-2xl font-bold mt-4 mb-2">{blogger.name}</h3>
                <p className="text-gray-600">
                  블로그 마스터즈에서 활동 중인 전문 블로거입니다.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Portfolio Modal */}
      <Modal
        isOpen={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        title="새 포트폴리오 추가"
        size="lg"
      >
        <form onSubmit={handleAddPortfolio} className="space-y-4">
          <Input
            label="프로젝트 제목"
            value={newPortfolio.title}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
            required
          />
          <Textarea
            label="프로젝트 설명"
            value={newPortfolio.description}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
            required
          />
          <Input
            label="카테고리"
            value={newPortfolio.category}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ROA (%)"
              type="number"
              value={newPortfolio.roa}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, roa: e.target.value })}
              required
            />
            <Input
              label="CCR (%)"
              type="number"
              value={newPortfolio.ccr}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, ccr: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="클릭 수"
              type="number"
              value={newPortfolio.clicks}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, clicks: e.target.value })}
              required
            />
            <Input
              label="전환 수"
              type="number"
              value={newPortfolio.conversions}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, conversions: e.target.value })}
              required
            />
            <Input
              label="수익 (원)"
              type="number"
              value={newPortfolio.revenue}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, revenue: e.target.value })}
              required
            />
          </div>
          <Input
            label="포스팅 링크"
            type="url"
            value={newPortfolio.link}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, link: e.target.value })}
            required
          />
          <Button type="submit" fullWidth>추가하기</Button>
        </form>
      </Modal>
    </div>
  );
};

export default BloggerDashboard;

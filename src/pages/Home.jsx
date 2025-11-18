import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Tab from '../components/common/Tab';
import { METRICS, BADGES, PROCESS_STEPS } from '../data/constants';

const Home = () => {
  const [activeTab, setActiveTab] = useState('advertiser');
  const [selectedMetric, setSelectedMetric] = useState('roa');
  const location = useLocation();

  const tabs = [
    { id: 'advertiser', label: '자영업자/광고주', icon: '🏪' },
    { id: 'blogger', label: '블로거', icon: '✍️' }
  ];

  useEffect(() => {
    // 다른 페이지에서 홈으로 왔을 때 특정 섹션으로 스크롤
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                🚀 매출로 검증된 블로거 매칭 플랫폼
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                홍보가 아닌<br />
                <span className="text-yellow-300">매출</span>을<br />
                만드는 블로거
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                단순 트래픽이 아닌, <strong>실제 ROA와 CCR</strong>로 검증된<br />
                전문 블로거만 섭외하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/advertiser-signup">
                  <Button variant="white" size="lg">
                    광고주로 시작하기
                  </Button>
                </Link>
                <Link to="/blogger-signup">
                  <Button variant="secondary" size="lg">
                    블로거로 가입하기
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative float-animation hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">평균 ROA</span>
                    <span className="text-3xl font-bold text-yellow-300">342%</span>
                  </div>
                  <div className="bg-white/20 h-3 rounded-full overflow-hidden">
                    <div className="bg-yellow-300 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-white/80">평균 CCR</span>
                    <span className="text-3xl font-bold text-green-300">18.5%</span>
                  </div>
                  <div className="bg-white/20 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-300 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {activeTab === 'advertiser' && (
            <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
              <Card gradient="blue" hover>
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3">데이터 기반 평가</h3>
                <p className="text-gray-600 leading-relaxed">
                  방문자 수가 아닌 <strong className="text-blue-900">ROA, CCR</strong> 등 실제 매출 성과로 블로거를 평가합니다.
                </p>
              </Card>
              <Card gradient="blue" hover>
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-2xl font-bold mb-3">고유 링크 트래킹</h3>
                <p className="text-gray-600 leading-relaxed">
                  모든 성과를 <strong className="text-blue-600">고유 링크</strong>로 추적하여 데이터 조작을 원천 차단합니다.
                </p>
              </Card>
              <Card gradient="green" hover>
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3">안전한 에스크로</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-green-600">7~14일 검증 기간</strong> 후 정산하여 허위 보고를 방지합니다.
                </p>
              </Card>
            </div>
          )}

          {activeTab === 'blogger' && (
            <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
              <Card gradient="yellow" hover>
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3">수익 극대화</h3>
                <p className="text-gray-600 leading-relaxed">
                  최저가 경쟁 종식! <strong className="text-yellow-600">성과 기반 고액 정산</strong>과 성과급으로 수익을 극대화하세요.
                </p>
              </Card>
              <Card gradient="pink" hover>
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold mb-3">마스터 등급 획득</h3>
                <p className="text-gray-600 leading-relaxed">
                  객관적인 <strong className="text-pink-600">다이아몬드/플래티넘</strong> 등급으로 전문성을 인정받으세요.
                </p>
              </Card>
              <Card gradient="indigo" hover>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3">프리미엄 섭외</h3>
                <p className="text-gray-600 leading-relaxed">
                  높은 등급은 <strong className="text-indigo-600">고액 섭외 요청</strong>이 자동으로 집중됩니다.
                </p>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="metrics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">핵심 성과 지표</h2>
            <p className="text-xl text-gray-600">
              마케팅 투자 대비 효율을 보여주는 <strong>검증된 데이터</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.entries(METRICS).map(([key, metric]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  selectedMetric === key
                    ? `bg-gradient-to-br ${metric.color} text-white shadow-2xl scale-105`
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{metric.icon}</div>
                <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
                <p className={selectedMetric === key ? 'text-white/90' : 'text-gray-600'}>
                  {metric.description}
                </p>
              </button>
            ))}
          </div>

          <Card padding="lg" className="shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className={`inline-block text-5xl mb-4 bg-gradient-to-r ${METRICS[selectedMetric].color} bg-clip-text text-transparent`}>
                  {METRICS[selectedMetric].icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{METRICS[selectedMetric].title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">📌 측정 방식</p>
                    <p className="font-mono text-lg font-semibold text-gray-800">
                      {METRICS[selectedMetric].formula}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                    <p className="text-sm text-blue-600 mb-1">💡 예시</p>
                    <p className="text-gray-800 font-medium">
                      {METRICS[selectedMetric].example}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-8">
                <div className="text-center space-y-6">
                  <div>
                    <p className="text-gray-600 mb-2">플랫폼 평균</p>
                    <p className="stat-number gradient-text">
                      {selectedMetric === 'roa' && '342%'}
                      {selectedMetric === 'ccr' && '18.5%'}
                      {selectedMetric === 'masterScore' && '87점'}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                    <div>
                      <p className="text-sm text-gray-600">최고</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedMetric === 'roa' && '580%'}
                        {selectedMetric === 'ccr' && '31%'}
                        {selectedMetric === 'masterScore' && '98'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">중간</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedMetric === 'roa' && '320%'}
                        {selectedMetric === 'ccr' && '16%'}
                        {selectedMetric === 'masterScore' && '75'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">최저</p>
                      <p className="text-2xl font-bold text-gray-600">
                        {selectedMetric === 'roa' && '180%'}
                        {selectedMetric === 'ccr' && '8%'}
                        {selectedMetric === 'masterScore' && '52'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Badge System */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">마스터 등급 시스템</h2>
            <p className="text-xl text-gray-600">
              성과로 검증된 전문가만이 받을 수 있는 <strong>신뢰의 배지</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BADGES.slice(0, 3).map((badge) => (
              <div key={badge.id} className="relative">
                <div className={`${badge.class} rounded-3xl p-8 card-hover text-center h-full`}>
                  <div className="text-7xl mb-4">{badge.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
                  <div className="text-4xl font-bold mb-4">{badge.score}+</div>
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-sm text-gray-700">
                    {badge.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl p-8 text-center border border-blue-100">
            <p className="text-lg text-gray-700">
              <strong className="text-blue-900">높은 등급</strong>의 블로거일수록
              <strong className="text-pink-600"> 자동으로 프리미엄 섭외 요청</strong>이 집중됩니다
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">간편한 5단계 프로세스</h2>
            <p className="text-xl text-gray-600">
              검색부터 정산까지, <strong>투명하고 안전한</strong> 협업 과정
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-5 gap-8 relative">
              {PROCESS_STEPS.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-block bg-white rounded-2xl p-6 shadow-lg card-hover mb-4 relative z-10">
                    <div className="text-5xl mb-3">{item.icon}</div>
                    <div className="w-12 h-12 gradient-bg text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white" id="cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl mb-12 text-white/90 leading-relaxed">
            '노출'이 아닌 '매출'로 평가받는<br />
            새로운 블로그 마케팅의 시대
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-left hover:bg-white/20 transition">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold mb-3">자영업자/광고주</h3>
              <p className="text-white/90 mb-6">
                검증된 블로거로<br />확실한 매출 증대를
              </p>
              <Link to="/advertiser-signup">
                <Button variant="white" fullWidth>
                  광고주 가입하기
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-left hover:bg-white/20 transition">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold mb-3">블로거</h3>
              <p className="text-white/90 mb-6">
                당신의 진짜 실력을<br />정당한 대가로
              </p>
              <Link to="/blogger-signup">
                <Button variant="yellow" fullWidth>
                  블로거 가입하기
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 inline-block">
            <p className="text-sm text-white/80">
              📞 문의: contact@blogmasters.kr | ☎️ 1588-1234
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

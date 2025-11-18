import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import { SAMPLE_BLOGGERS, SAMPLE_PORTFOLIO, SAMPLE_REVIEWS } from '../data/mockData';

const BloggerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    businessName: '',
    budget: '',
    message: ''
  });

  // 실제로는 API에서 블로거 정보를 가져와야 함
  const blogger = SAMPLE_BLOGGERS.find(b => b.id === parseInt(id)) || SAMPLE_BLOGGERS[0];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('섭외 요청:', contactForm);
    alert('섭외 요청이 전송되었습니다!');
    setShowContactModal(false);
    setContactForm({ businessName: '', budget: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← 뒤로 가기
        </Button>

        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 text-center">
              <div className="text-8xl mb-4">{blogger.avatar}</div>
              <Badge type={blogger.badge} size="lg" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{blogger.name}</h1>
              <p className="text-gray-600 mb-6">
                {blogger.bio || '전문 블로거로 활동하고 있습니다. ROA와 CCR을 중시하는 성과 중심의 콘텐츠를 제작합니다.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  📍 {blogger.region}
                </span>
                {blogger.specialty.map((spec, idx) => (
                  <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setShowContactModal(true)} className="flex-1">
                  섭외 요청하기
                </Button>
                <Button variant="outline" className="flex-1">
                  포트폴리오 보기
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card gradient="green" className="text-center">
            <div className="text-sm text-gray-600 mb-2">평균 ROA</div>
            <div className="text-4xl font-bold text-green-600 mb-1">{blogger.roa}%</div>
            <div className="text-xs text-gray-500">업계 평균 대비 +120%</div>
          </Card>

          <Card gradient="blue" className="text-center">
            <div className="text-sm text-gray-600 mb-2">평균 CCR</div>
            <div className="text-4xl font-bold text-blue-600 mb-1">{blogger.ccr}%</div>
            <div className="text-xs text-gray-500">업계 평균 대비 +95%</div>
          </Card>

          <Card gradient="yellow" className="text-center">
            <div className="text-sm text-gray-600 mb-2">마스터 지수</div>
            <div className="text-4xl font-bold text-yellow-600 mb-1">{blogger.masterScore}</div>
            <div className="text-xs text-gray-500">상위 1% 등급</div>
          </Card>

          <Card gradient="pink" className="text-center">
            <div className="text-sm text-gray-600 mb-2">성공률</div>
            <div className="text-4xl font-bold text-pink-600 mb-1">{blogger.successRate}%</div>
            <div className="text-xs text-gray-500">총 {blogger.postCount}건</div>
          </Card>
        </div>

        {/* Pricing Info */}
        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">평균 단가</h3>
              <p className="text-gray-600 text-sm">포스팅 1건 기준 평균 금액입니다.</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {(blogger.avgPrice / 10000).toLocaleString()}만원
              </div>
              <div className="text-sm text-gray-500">협의 가능</div>
            </div>
          </div>
        </Card>

        {/* Portfolio Section */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-6">📁 포트폴리오</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {SAMPLE_PORTFOLIO.slice(0, 4).map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{item.image}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">ROA</div>
                    <div className="text-2xl font-bold text-green-600">{item.roa}%</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">CCR</div>
                    <div className="text-2xl font-bold text-blue-600">{item.ccr}%</div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>👆 {item.clicks.toLocaleString()}</span>
                  <span>✅ {item.conversions}</span>
                  <span>💰 {(item.revenue / 10000).toLocaleString()}만</span>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-semibold"
                >
                  포스팅 보기 →
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-6">⭐ 후기 ({SAMPLE_REVIEWS.length})</h2>
          <div className="space-y-6">
            {SAMPLE_REVIEWS.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.author}</h4>
                      <p className="text-sm text-gray-500">{review.businessType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.verified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ 검증됨
                      </span>
                    )}
                    <div className="flex text-yellow-500">
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 {review.date}</span>
                  {review.roa && <span className="font-semibold text-green-600">ROA {review.roa}% 달성</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 shadow-lg md:hidden">
          <Button onClick={() => setShowContactModal(true)} fullWidth>
            섭외 요청하기
          </Button>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="섭외 요청"
        size="md"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">{blogger.avatar}</div>
              <div>
                <h3 className="font-bold text-gray-900">{blogger.name}</h3>
                <p className="text-sm text-gray-600">평균 {(blogger.avgPrice / 10000).toLocaleString()}만원</p>
              </div>
            </div>
          </div>

          <Input
            label="업체명"
            value={contactForm.businessName}
            onChange={(e) => setContactForm({ ...contactForm, businessName: e.target.value })}
            placeholder="예: 홍길동 레스토랑"
            required
          />

          <Input
            label="제안 금액 (원)"
            type="number"
            value={contactForm.budget}
            onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
            placeholder="예: 300000"
            required
          />

          <Textarea
            label="섭외 메시지"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            placeholder="협업 제안 내용을 자유롭게 작성해주세요..."
            rows={6}
            required
          />

          <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
            <p className="mb-2">📌 섭외 프로세스</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>섭외 요청 전송</li>
              <li>블로거 검토 (1-2일 소요)</li>
              <li>수락 시 협업 진행</li>
              <li>성과 확인 후 정산</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setShowContactModal(false)} className="flex-1">
              취소
            </Button>
            <Button type="submit" className="flex-1">
              요청 보내기
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BloggerProfile;

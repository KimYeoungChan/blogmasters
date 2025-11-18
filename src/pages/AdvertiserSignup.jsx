import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Textarea from '../components/common/Textarea';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import { REGIONS, BUSINESS_CATEGORIES } from '../data/constants';

const AdvertiserSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Step 1: 대표자 정보
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',

    // Step 2: 사업자 정보
    businessName: '',
    businessNumber: '',
    businessType: '',
    businessRegion: '',
    businessAddress: '',

    // Step 3: 운영 정보
    categories: [],
    operatingHours: '',
    onlineChannels: {
      website: '',
      instagram: '',
      facebook: '',
      kakao: '',
      naverPlace: ''
    },

    // Step 4: 약관 동의
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('channel_')) {
      const channelName = name.replace('channel_', '');
      setFormData(prev => ({
        ...prev,
        onlineChannels: {
          ...prev.onlineChannels,
          [channelName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = '이름을 입력해주세요';
      if (!formData.email) {
        newErrors.email = '이메일을 입력해주세요';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다';
      }
      if (!formData.password) {
        newErrors.password = '비밀번호를 입력해주세요';
      } else if (formData.password.length < 8) {
        newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
      }
      if (formData.password !== formData.passwordConfirm) {
        newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
      }
      if (!formData.phone) {
        newErrors.phone = '연락처를 입력해주세요';
      }
    }

    if (step === 2) {
      if (!formData.businessName) newErrors.businessName = '업체명을 입력해주세요';
      if (!formData.businessNumber) newErrors.businessNumber = '사업자등록번호를 입력해주세요';
      if (!formData.businessType) newErrors.businessType = '업종을 선택해주세요';
      if (!formData.businessRegion) newErrors.businessRegion = '지역을 선택해주세요';
      if (!formData.businessAddress) newErrors.businessAddress = '주소를 입력해주세요';
    }

    if (step === 3) {
      if (formData.categories.length === 0) {
        newErrors.categories = '최소 1개 이상의 카테고리를 선택해주세요';
      }
    }

    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = '필수 약관에 동의해주세요';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = '필수 약관에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('회원가입 데이터:', formData);
      // 실제로는 API 호출
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    }
  };

  const stepLabels = ['대표자 정보', '사업자 정보', '운영 정보', '약관 동의'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-primary">블로그 마스터즈</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🏪 광고주 회원가입</h2>
          <p className="text-gray-600">매출로 검증된 블로거와 협업하세요</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={stepLabels} />

        {/* Form */}
        <Card className="shadow-xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1: 대표자 정보 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">대표자 정보</h3>

                <Input
                  label="이름"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <Input
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <Input
                  label="비밀번호"
                  type="password"
                  name="password"
                  placeholder="8자 이상 입력"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <Input
                  label="비밀번호 확인"
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호 재입력"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  error={errors.passwordConfirm}
                  required
                />

                <Input
                  label="연락처"
                  type="tel"
                  name="phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              </div>
            )}

            {/* Step 2: 사업자 정보 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">사업자 정보</h3>

                <Input
                  label="업체명"
                  name="businessName"
                  placeholder="홍길동 레스토랑"
                  value={formData.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                  required
                />

                <Input
                  label="사업자등록번호"
                  name="businessNumber"
                  placeholder="123-45-67890"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  error={errors.businessNumber}
                  required
                />

                <Select
                  label="업종"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  options={BUSINESS_CATEGORIES}
                  placeholder="업종을 선택하세요"
                  error={errors.businessType}
                  required
                />

                <Select
                  label="지역"
                  name="businessRegion"
                  value={formData.businessRegion}
                  onChange={handleChange}
                  options={REGIONS}
                  placeholder="지역을 선택하세요"
                  error={errors.businessRegion}
                  required
                />

                <Input
                  label="주소"
                  name="businessAddress"
                  placeholder="서울시 강남구 테헤란로 123"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  error={errors.businessAddress}
                  required
                />
              </div>
            )}

            {/* Step 3: 운영 정보 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">운영 정보</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    홍보 카테고리 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {BUSINESS_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-4 py-3 rounded-xl border-2 font-medium transition ${
                          formData.categories.includes(category)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {errors.categories && (
                    <p className="mt-2 text-sm text-red-500">{errors.categories}</p>
                  )}
                </div>

                <Input
                  label="운영 시간"
                  name="operatingHours"
                  placeholder="예: 평일 10:00-22:00, 주말 11:00-23:00"
                  value={formData.operatingHours}
                  onChange={handleChange}
                />

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">온라인 채널 (선택)</h4>
                  <div className="space-y-3">
                    <Input
                      name="channel_website"
                      placeholder="웹사이트 URL"
                      value={formData.onlineChannels.website}
                      onChange={handleChange}
                    />
                    <Input
                      name="channel_instagram"
                      placeholder="인스타그램 계정 (@username)"
                      value={formData.onlineChannels.instagram}
                      onChange={handleChange}
                    />
                    <Input
                      name="channel_facebook"
                      placeholder="페이스북 페이지"
                      value={formData.onlineChannels.facebook}
                      onChange={handleChange}
                    />
                    <Input
                      name="channel_kakao"
                      placeholder="카카오톡 채널"
                      value={formData.onlineChannels.kakao}
                      onChange={handleChange}
                    />
                    <Input
                      name="channel_naverPlace"
                      placeholder="네이버 플레이스 URL"
                      value={formData.onlineChannels.naverPlace}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 약관 동의 */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">약관 동의</h3>

                <div className="space-y-4">
                  <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div className="ml-3 flex-1">
                      <span className="font-semibold text-gray-900">
                        이용약관 동의 <span className="text-red-500">*</span>
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        블로그 마스터즈의 이용약관을 확인하였으며 이에 동의합니다.
                      </p>
                      {errors.agreeTerms && (
                        <p className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>
                      )}
                    </div>
                    <a href="#" className="text-blue-600 text-sm hover:underline">
                      보기
                    </a>
                  </label>

                  <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div className="ml-3 flex-1">
                      <span className="font-semibold text-gray-900">
                        개인정보 처리방침 동의 <span className="text-red-500">*</span>
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        개인정보 수집 및 이용에 대한 안내를 확인하였으며 이에 동의합니다.
                      </p>
                      {errors.agreePrivacy && (
                        <p className="text-sm text-red-500 mt-1">{errors.agreePrivacy}</p>
                      )}
                    </div>
                    <a href="#" className="text-blue-600 text-sm hover:underline">
                      보기
                    </a>
                  </label>

                  <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div className="ml-3 flex-1">
                      <span className="font-semibold text-gray-900">마케팅 정보 수신 동의 (선택)</span>
                      <p className="text-sm text-gray-600 mt-1">
                        이벤트, 프로모션 등의 마케팅 정보를 이메일로 수신합니다.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="flex-1"
                >
                  이전
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1"
                >
                  다음
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1"
                >
                  가입완료
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* 로그인 링크 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserSignup;

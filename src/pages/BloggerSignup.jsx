import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Textarea from '../components/common/Textarea';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import { REGIONS, SPECIALTIES, WRITING_STYLES, SNS_PLATFORMS } from '../data/constants';

const BloggerSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1: 기본 정보
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',

    // Step 2: SNS 계정
    snsAccounts: [],

    // Step 3: 활동 정보
    region: '',
    specialties: [],
    writingStyles: [],

    // Step 4: 자기소개
    bio: '',

    // Step 5: 약관 동의
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [newSnsAccount, setNewSnsAccount] = useState({ platform: '', url: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSpecialtyToggle = (specialty) => {
    setFormData(prev => {
      const newSpecialties = prev.specialties.includes(specialty.id)
        ? prev.specialties.filter(s => s !== specialty.id)
        : prev.specialties.length < 5
        ? [...prev.specialties, specialty.id]
        : prev.specialties;

      return { ...prev, specialties: newSpecialties };
    });
  };

  const handleWritingStyleToggle = (style) => {
    setFormData(prev => {
      const newStyles = prev.writingStyles.includes(style.id)
        ? prev.writingStyles.filter(s => s !== style.id)
        : prev.writingStyles.length < 3
        ? [...prev.writingStyles, style.id]
        : prev.writingStyles;

      return { ...prev, writingStyles: newStyles };
    });
  };

  const handleAddSnsAccount = () => {
    if (newSnsAccount.platform && newSnsAccount.url) {
      setFormData(prev => ({
        ...prev,
        snsAccounts: [...prev.snsAccounts, { ...newSnsAccount, id: Date.now() }]
      }));
      setNewSnsAccount({ platform: '', url: '' });
    }
  };

  const handleRemoveSnsAccount = (id) => {
    setFormData(prev => ({
      ...prev,
      snsAccounts: prev.snsAccounts.filter(account => account.id !== id)
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
      if (!formData.phone) newErrors.phone = '연락처를 입력해주세요';
    }

    if (step === 2) {
      if (formData.snsAccounts.length === 0) {
        newErrors.snsAccounts = '최소 1개 이상의 SNS 계정을 추가해주세요';
      }
    }

    if (step === 3) {
      if (!formData.region) newErrors.region = '활동 지역을 선택해주세요';
      if (formData.specialties.length === 0) {
        newErrors.specialties = '최소 1개 이상의 전문 분야를 선택해주세요';
      }
      if (formData.writingStyles.length === 0) {
        newErrors.writingStyles = '최소 1개 이상의 글쓰기 스타일을 선택해주세요';
      }
    }

    if (step === 4) {
      if (!formData.bio || formData.bio.length < 50) {
        newErrors.bio = '자기소개는 최소 50자 이상 작성해주세요';
      }
    }

    if (step === 5) {
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
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    }
  };

  const stepLabels = ['기본 정보', 'SNS 계정', '활동 정보', '자기소개', '약관 동의'];

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">✍️ 블로거 회원가입</h2>
          <p className="text-gray-600">성과로 인정받는 전문 블로거가 되어보세요</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={stepLabels} />

        {/* Form */}
        <Card className="shadow-xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1: 기본 정보 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">기본 정보</h3>

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

            {/* Step 2: SNS 계정 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">SNS 계정</h3>
                <p className="text-gray-600 text-sm mb-4">
                  운영 중인 블로그 및 SNS 계정을 추가해주세요 (최소 1개 이상)
                </p>

                {/* SNS 계정 추가 폼 */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <Select
                    label="플랫폼"
                    value={newSnsAccount.platform}
                    onChange={(e) => setNewSnsAccount(prev => ({ ...prev, platform: e.target.value }))}
                    options={SNS_PLATFORMS}
                    placeholder="플랫폼 선택"
                  />
                  <Input
                    label="URL 또는 계정명"
                    placeholder="https://blog.naver.com/yourname"
                    value={newSnsAccount.url}
                    onChange={(e) => setNewSnsAccount(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <Button
                    type="button"
                    onClick={handleAddSnsAccount}
                    variant="outline"
                    fullWidth
                  >
                    + 추가하기
                  </Button>
                </div>

                {/* 추가된 SNS 계정 목록 */}
                {formData.snsAccounts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">추가된 계정</h4>
                    {formData.snsAccounts.map((account) => {
                      const platform = SNS_PLATFORMS.find(p => p.id === account.platform);
                      return (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{platform?.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900">{platform?.name}</p>
                              <p className="text-sm text-gray-600 truncate max-w-xs">{account.url}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSnsAccount(account.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {errors.snsAccounts && (
                  <p className="text-sm text-red-500">{errors.snsAccounts}</p>
                )}
              </div>
            )}

            {/* Step 3: 활동 정보 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">활동 정보</h3>

                <Select
                  label="주요 활동 지역"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  options={REGIONS}
                  placeholder="지역을 선택하세요"
                  error={errors.region}
                  required
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    전문 분야 (최대 5개) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SPECIALTIES.map((specialty) => (
                      <button
                        key={specialty.id}
                        type="button"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        disabled={!formData.specialties.includes(specialty.id) && formData.specialties.length >= 5}
                        className={`px-4 py-3 rounded-xl border-2 font-medium transition ${
                          formData.specialties.includes(specialty.id)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        <span className="mr-2">{specialty.emoji}</span>
                        {specialty.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    선택됨: {formData.specialties.length}/5
                  </p>
                  {errors.specialties && (
                    <p className="text-sm text-red-500 mt-1">{errors.specialties}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    글쓰기 스타일 (최대 3개) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {WRITING_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => handleWritingStyleToggle(style)}
                        disabled={!formData.writingStyles.includes(style.id) && formData.writingStyles.length >= 3}
                        className={`px-4 py-3 rounded-xl border-2 font-medium transition ${
                          formData.writingStyles.includes(style.id)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        <span className="mr-2">{style.emoji}</span>
                        {style.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    선택됨: {formData.writingStyles.length}/3
                  </p>
                  {errors.writingStyles && (
                    <p className="text-sm text-red-500 mt-1">{errors.writingStyles}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: 자기소개 */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">자기소개</h3>
                <p className="text-gray-600 text-sm mb-4">
                  자신의 블로그 운영 경력, 전문성, 특징 등을 자유롭게 작성해주세요.
                </p>

                <Textarea
                  label="자기소개"
                  name="bio"
                  placeholder="예) 5년차 맛집 블로거입니다. 주로 서울 강남권 레스토랑을 중심으로 리뷰하고 있으며, 평균 ROA 400% 이상의 성과를 기록하고 있습니다..."
                  value={formData.bio}
                  onChange={handleChange}
                  error={errors.bio}
                  rows={8}
                  required
                />
                <p className="text-sm text-gray-500">
                  {formData.bio.length}/최소 50자
                </p>
              </div>
            )}

            {/* Step 5: 약관 동의 */}
            {currentStep === 5 && (
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

export default BloggerSignup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('blogger'); // 'blogger' or 'advertiser'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 로그인 로직 (실제로는 API 호출)
    console.log('로그인 시도:', { userType, ...formData, rememberMe });

    // 임시: 대시보드로 리다이렉트
    if (userType === 'blogger') {
      navigate('/blogger-dashboard');
    } else {
      navigate('/advertiser-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 및 타이틀 */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-primary">블로그 마스터즈</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600">
            {userType === 'blogger' ? '블로거' : '광고주'} 계정으로 로그인하세요
          </p>
        </div>

        {/* 사용자 유형 선택 */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setUserType('blogger')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                userType === 'blogger'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✍️ 블로거
            </button>
            <button
              onClick={() => setUserType('advertiser')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                userType === 'advertiser'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏪 광고주
            </button>
          </div>
        </div>

        {/* 로그인 폼 */}
        <Card className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              label="이메일"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div>
              <Input
                type="password"
                name="password"
                label="비밀번호"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  비밀번호 찾기
                </a>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg">
              로그인
            </Button>
          </form>

          {/* 소셜 로그인 */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-yellow-400 text-sm font-medium text-gray-900 hover:bg-yellow-500 transition"
              >
                <span className="text-xl mr-2">💬</span>
                Kakao
              </button>
            </div>
          </div>
        </Card>

        {/* 회원가입 링크 */}
        <div className="text-center">
          <p className="text-gray-600">
            아직 계정이 없으신가요?{' '}
            <Link
              to={userType === 'blogger' ? '/blogger-signup' : '/advertiser-signup'}
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              회원가입하기
            </Link>
          </p>
        </div>

        {/* 테스트 계정 안내 (개발용) */}
        <Card gradient="blue" className="text-center">
          <p className="text-sm text-gray-700 mb-2">
            <strong>📝 테스트 계정</strong>
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>블로거: blogger@test.com / test1234</p>
            <p>광고주: advertiser@test.com / test1234</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

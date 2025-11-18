import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // 홈페이지가 아니면 홈으로 이동 후 스크롤
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // 이미 홈페이지면 바로 스크롤
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-primary">블로그 마스터즈</h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              서비스 소개
            </button>
            <button
              onClick={() => scrollToSection('metrics')}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              핵심 지표
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              프로세스
            </button>
            <Link to="/community" className="text-gray-700 hover:text-blue-600 transition">
              커뮤니티
            </Link>
          </nav>

          <Link to="/login">
            <Button size="sm">로그인</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

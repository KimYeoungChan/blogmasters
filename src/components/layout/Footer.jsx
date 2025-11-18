import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">블로그 마스터즈</h3>
            <p className="text-sm leading-relaxed">
              매출로 검증된 블로거 매칭 플랫폼
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/advertiser-signup" className="hover:text-white transition">
                  광고주 가입
                </Link>
              </li>
              <li>
                <Link to="/blogger-signup" className="hover:text-white transition">
                  블로거 가입
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  요금제
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  공지사항
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  이용가이드
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  1:1 문의
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">법적고지</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  사업자정보
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 블로그 마스터즈. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdvertiserSignup from './pages/AdvertiserSignup';
import BloggerSignup from './pages/BloggerSignup';
import BloggerDashboard from './pages/BloggerDashboard';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import BloggerProfile from './pages/BloggerProfile';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
            <Route path="/blogger-signup" element={<BloggerSignup />} />
            <Route path="/blogger-dashboard" element={<BloggerDashboard />} />
            <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
            <Route path="/blogger-profile/:id" element={<BloggerProfile />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

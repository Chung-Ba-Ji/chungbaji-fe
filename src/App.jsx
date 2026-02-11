import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/common/Hero'; 
import PolicyList from './pages/PolicyList';
import Community from './pages/Community';
import CalendarView from './pages/Calendar';
import Auth from './pages/Auth';
import { Toaster, toast } from 'sonner';

// Mock data for policies (should be kept in sync with PolicyList or imported)
const POLICIES = [
  {
    id: 1,
    title: "청년 월세 특별지원",
    category: "주거",
    region: "전국",
    status: "접수중",
    deadline: "2026-12-31",
    description: "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다.",
    tags: ["월세지원", "무주택청년"]
  },
  {
    id: 2,
    title: "청년 일자리 도약 장려금",
    category: "취업",
    region: "서울",
    status: "접수중",
    deadline: "2026-06-30",
    description: "취업에 어려움을 겪는 청년을 채용한 중소기업에 장려금을 지원합니다.",
    tags: ["중소기업", "취업장려"]
  },
  {
    id: 3,
    title: "경기도 청년 기본소득",
    category: "복지",
    region: "경기",
    status: "마감임박",
    deadline: "2026-03-15",
    description: "경기도에 거주하는 만 24세 청년에게 분기별 25만원을 지급합니다.",
    tags: ["기본소득", "경기도민"]
  },
  {
    id: 4,
    title: "희망두배 청년통장",
    category: "금융",
    region: "서울",
    status: "공고중",
    deadline: "2026-05-10",
    description: "참가자가 매월 저축하는 금액과 동일한 금액을 서울시가 적립해줍니다.",
    tags: ["자산형성", "저축"]
  },
  {
    id: 5,
    title: "청년 창업 지원 사업",
    category: "창업",
    region: "전국",
    status: "접수중",
    deadline: "2026-04-20",
    description: "혁신적인 아이디어를 가진 청년 창업가에게 사업화 자금을 지원합니다.",
    tags: ["스타트업", "사업비지원"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [bookmarks, setBookmarks] = useState([1, 3]); // Initial mock bookmarks

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    toast.success(`${userData.name}님, 환영합니다!`);
  };

  const toggleBookmark = (id) => {
    if (!user) {
      toast.error('북마크 기능을 사용하려면 먼저 로그인해주세요.');
      handleLoginClick();
      return;
    }

    setBookmarks(prev => {
      if (prev.includes(id)) {
        toast.info('북마크에서 제거되었습니다.');
        return prev.filter(bId => bId !== id);
      } else {
        toast.success('북마크에 추가되었습니다. 달력에서 확인해보세요!');
        return [...prev, id];
      }
    });
  };

  const bookmarkedPolicies = POLICIES.filter(p => bookmarks.includes(p.id));

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLoginClick={handleLoginClick}
      />

      <main className="pt-16">
        {activeTab === 'home' && (
          <>
            <Hero onFindPolicyClick={() => setActiveTab('policies')} />
            <div className="bg-slate-50">
              <PolicyList bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
            </div>
          </>
        )}

        {activeTab === 'policies' && (
          <div className="animate-in fade-in duration-500">
             <PolicyList bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Community />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="animate-in fade-in duration-500">
            <CalendarView bookmarkedPolicies={bookmarkedPolicies} />
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setShowAuthModal(false)}
          ></div>
          <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-200">
            <Auth 
              mode={authMode} 
              onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}

      <Toaster position="top-center" />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <span className="text-xl font-bold text-white">YouthHub</span>
              </div>
              <p className="text-sm leading-relaxed">
                대한민국 모든 청년들의 <br />
                내일을 응원하는 정책 플랫폼입니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">서비스</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setActiveTab('policies')} className="hover:text-teal-400 transition-colors">정책 찾기</button></li>
                <li><button onClick={() => setActiveTab('community')} className="hover:text-teal-400 transition-colors">커뮤니티</button></li>
                <li><button onClick={() => setActiveTab('calendar')} className="hover:text-teal-400 transition-colors">내 일정 관리</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">고객지원</h4>
              <ul className="space-y-4 text-sm">
                <li>공지사항</li>
                <li>자주 묻는 질문</li>
                <li>문의하기</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">정보</h4>
              <ul className="space-y-4 text-sm">
                <li>이용약관</li>
                <li>개인정보처리방침</li>
                <li>운영정책</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>© 2026 YouthHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

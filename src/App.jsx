import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/common/Hero';
import PolicyList from './pages/PolicyList';
import Community from './pages/Community';
import CalendarView from './pages/Calendar';
import Auth from './pages/Auth';
import { Toaster, toast } from 'sonner';
import api from './api/axios';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [schedules, setSchedules] = useState([]); // 일정 데이터 

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_info');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error("사용자 정보 복구 에러:", error);
        localStorage.removeItem('user_info');
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  });

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user_info', JSON.stringify(userData));
    setShowAuthModal(false);
    const userName = userData.nickname || userData.name || '사용자';
    toast.success(`${userName}님, 환영합니다!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_info');
    localStorage.removeItem('token');
    setActiveTab('home');
    toast.info("로그아웃 되었습니다.");
  };

  // schedules 기반으로 bookmarks(policyId 배열) 파생
  const bookmarks = useMemo(() => {
    return (schedules || [])
      .filter(s => s.status === 'ACTIVE')
      .map(s => Number(s.policyId));
  }, [schedules]);


  // 일정 조회 (북마크 표시 포함)
  const fetchSchedules = useCallback(async () => {
    if (!user) {
      setSchedules([]);
      return;
    }

    try {
      const response = await api.get('/api/schedule/list');
      setSchedules(response.data || []);
    } catch (error) {
      console.error('>>>>> 데이터 로드 실패:', error);
      setSchedules([]);
    }
  }, [user]);

  // 유저 변경 시 schedules 재조회
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const toggleBookmark = async (policyId) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      handleLoginClick();
      return;
    }

    // 현재 schedules 기준으로 ACTIVE인지 판단
    const isBookmarked = schedules.some(
      (s) => s.policyId === policyId && s.status === 'ACTIVE'
    );

    // Optimistic UI (서버 응답 늦을 때도 즉시 반영)
    // - 스케줄 구조를 정확히 모르니, 최소한으로 "ACTIVE 유무만" 임시 반영
    // - 실패 시 fetchSchedules로 되돌리면 됨
    setSchedules((prev) => {
      const list = prev || [];

      if (isBookmarked) {
        // ACTIVE -> 제거(또는 INACTIVE로 바꿈)
        return list.map((s) =>
          s.policyId === policyId && s.status === 'ACTIVE'
            ? { ...s, status: 'INACTIVE' }
            : s
        );
      } else {
        // 없다면 임시 ACTIVE 하나 추가
        return [...list, { policyId, status: 'ACTIVE' }];
      }
    });

    try {
      if (isBookmarked) {
        // DELETE /api/bookmarks/delete  (body 필요)
        await api.delete('/api/bookmarks/delete', {
          data: { policyId },
        });
        toast.info('북마크에서 제거되었습니다.');
      } else {
        // POST /api/bookmarks/register
        await api.post('/api/bookmarks/register', { policyId });
        toast.success('북마크에 추가되었습니다!');
      }

      // 서버 상태로 최종 동기화 
      await fetchSchedules();
    } catch (error) {
      console.error('처리 실패:', error);
      toast.error('북마크 처리에 실패했습니다.');

      // 실패 시 서버 상태로 복구
      await fetchSchedules();
    }
  };

  // 캘린더에 넘길 데이터 
  const bookmarkedPolicies = schedules;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* 로그인 정보 및 로그아웃 전달 */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
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
            <Community user={user} />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="animate-in fade-in duration-500">
            <CalendarView bookmarkedPolicies={bookmarkedPolicies} />
          </div>
        )}
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          ></div>
          <div className={`relative z-10 w-full transition-all duration-500 animate-in zoom-in-95 ${
            authMode === 'signup' ? 'max-w-[1100px]' : 'max-w-md'
          }`}>
            <Auth 
              mode={authMode} 
              onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}

      <Toaster position="top-center" />

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <span className="text-xl font-bold text-white">청바지</span>
              </div>
              <p className="text-sm leading-relaxed">
                대한민국 모든 청년들의 <br />
                내일을 응원하는 정책 플랫폼입니다.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">서비스</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <button
                    onClick={() => setActiveTab('policies')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    정책 찾기
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('community')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    커뮤니티
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    내 일정 관리
                  </button>
                </li>
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
            <span className="text-xl font-bold text-white">YouthHub</span>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>© 2026 chungbaji. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
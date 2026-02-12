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
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [schedules, setSchedules] = useState([]); // 일정 데이터 (서버가 진실)

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    toast.success(`${userData.name}님, 환영합니다!`);
  };

  // schedules 기반으로 bookmarks(policyId 배열) 파생
  const bookmarks = useMemo(() => {
    return (schedules || [])
      .filter((s) => s.status === 'ACTIVE')
      .map((s) => s.policyId);
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

    // ✅ Optimistic UI (서버 응답 늦을 때도 즉시 반영)
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

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>© 2026 YouthHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

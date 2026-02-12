import React, { useState } from 'react';
import { User, Camera, MessageSquare, Bookmark, FileText, ChevronRight } from 'lucide-react';

const MyPage = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState('posts');

  const subTabs = [
    { id: 'posts', label: '내가 쓴 글', count: 2, icon: <FileText size={18} /> },
    { id: 'comments', label: '내가 쓴 댓글', count: 2, icon: <MessageSquare size={18} /> },
    { id: 'bookmarks', label: '북마크', count: 2, icon: <Bookmark size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">마이페이지</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 왼쪽: 프로필 카드 */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                <User size={48} />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{user?.nickname || '회원'}님</h2>
            <p className="text-sm text-slate-400 mb-6">{user?.email}</p>
            <button className="w-full py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200">
              개인정보 수정
            </button>
          </div>
        </div>

        {/* 오른쪽: 활동 내역 */}
        <div className="md:col-span-9 space-y-6">
          {/* 서브 탭 메뉴 */}
          <div className="bg-slate-100/50 p-1.5 rounded-2xl flex gap-2 w-fit">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  activeSubTab === tab.id
                    ? 'bg-slate-600 text-white shadow-md'
                    : 'text-slate-500 hover:bg-white/50'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  activeSubTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* 목록 아이템 (예시) */}
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-600 text-[11px] font-bold rounded-md">주거</span>
                  <span className="text-xs text-slate-400">• 2시간 전</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                  청년 월세 지원 대상자 선정됐어요! 후기 남깁니다
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  서류 준비하는게 생각보다 까다로웠는데, 주민등록등본이랑 소득증빙서류 잘 챙기니까 바로 되더라고요...
                </p>
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><FileText size={14} /> 서울청년88</span>
                    <span className="flex items-center gap-1.5">👍 24</span>
                    <span className="flex items-center gap-1.5">💬 12</span>
                    <span className="flex items-center gap-1.5">👁 156</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
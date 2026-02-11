import React, { useState } from 'react';
import { Search, Bookmark, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

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
  }
];

const CATEGORIES = ["전체", "주거", "취업", "금융", "복지", "창업", "교육"];

const PolicyCard = ({ policy, onBookmark, isBookmarked }) => (
  <Motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-xl transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        policy.status === '접수중' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {policy.status}
      </span>
      <button 
        onClick={() => onBookmark(policy.id)}
        className={`p-2 rounded-full transition-colors ${
          isBookmarked ? 'bg-teal-50 text-teal-600' : 'text-slate-300 hover:bg-slate-50'
        }`}
      >
        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
      </button>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
      {policy.title}
    </h3>
    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{policy.description}</p>
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <div className="flex items-center gap-3 text-slate-400 text-xs">
        <div className="flex items-center gap-1"><MapPin size={14} />{policy.region}</div>
        <div className="flex items-center gap-1"><Calendar size={14} />{policy.deadline}</div>
      </div>
      <button className="text-teal-600 text-sm font-semibold flex items-center gap-1">
        자세히 보기 <ChevronRight size={16} />
      </button>
    </div>
  </Motion.div>
);

const PolicyList = ({ bookmarks = [], toggleBookmark }) => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPolicies = POLICIES.filter(p => 
    (activeCategory === "전체" || p.category === activeCategory) &&
    (p.title.includes(searchQuery))
  );

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">나에게 맞는 정책 찾기</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="정책명을 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-100 focus:ring-2 focus:ring-teal-500/20 outline-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === cat ? 'bg-teal-600 text-white' : 'bg-white border text-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map(policy => (
          <PolicyCard 
            key={policy.id} 
            policy={policy} 
            isBookmarked={bookmarks.includes(policy.id)}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>
    </section>
  );
};

export default PolicyList;
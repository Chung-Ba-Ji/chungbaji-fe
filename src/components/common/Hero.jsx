import React from 'react';
import { Search, ChevronRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import { motion as Motion } from 'framer-motion'; 
import { ImageWithFallback } from '../ui/figma/ImageWithFallback'; 

const Hero = ({ onFindPolicyClick }) => {
  return (
    <div className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold mb-6"
            >
              <Sparkles size={14} />
              <span>2026년 최신 청년 정책 업데이트 완료</span>
            </Motion.div>
            
            <Motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] mb-6"
            >
              당신의 꿈을 응원하는 <br />
              <span className="text-teal-600">청년 정책</span>의 모든 것
            </Motion.h1>

            <Motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              복잡한 지원 사업들, 이제 일일이 찾지 마세요. <br />
              나이와 지역만 입력하면 나에게 딱 맞는 혜택을 골라드립니다.
            </Motion.p>

            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={onFindPolicyClick}
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center justify-center gap-2 text-lg"
              >
                정책 맞춤 추천받기
                <ChevronRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-teal-200 hover:text-teal-600 transition-all flex items-center justify-center gap-2 text-lg">
                인기 커뮤니티 보기
              </button>
            </Motion.div>

            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8"
            >
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-slate-800">2,500+</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">등록된 정책 수</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-slate-800">12만+</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">누적 사용자</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-slate-800">45k+</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">일정 알림 발송</span>
              </div>
            </Motion.div>
          </div>

          <Motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1532799643465-f7e1abab11e7?..."
                className="w-full aspect-square object-cover"
                alt="Youth Success"
              />
            </div>
            
            {/* Floating cards */}
            <Motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">매칭 성공률</p>
                <p className="text-sm font-black text-slate-800">89.4% 증가</p>
              </div>
            </Motion.div>

            <Motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">활발한 커뮤니티</p>
                <p className="text-sm font-black text-slate-800">매일 300+ 새 글</p>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; // 관습적으로 default export 사용
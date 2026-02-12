import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Auth = ({ mode = 'login', onToggleMode, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ name: '홍길동', email: 'user@example.com' });
    }, 1500);
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-600/20">
            <span className="text-white font-bold text-3xl">Y</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {mode === 'login' ? '다시 오신 것을 환영해요!' : '청년허브의 회원이 되어보세요'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {mode === 'login' ? '로그인하여 나만의 정책 일정을 관리하세요' : '나에게 꼭 맞는 정책 정보를 받아보세요'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">이름</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="실명을 입력해주세요"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">이메일</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="example@email.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-end">
              <button type="button" className="text-xs font-semibold text-teal-600 hover:underline">
                비밀번호를 잊으셨나요?
              </button>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {mode === 'login' ? '로그인' : '회원가입 완료'}
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {mode === 'login' ? '아직 회원이 아니신가요?' : '이미 계정이 있으신가요?'}
            <button 
              onClick={onToggleMode}
              className="ml-2 text-teal-600 font-bold hover:underline"
            >
              {mode === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>

        {mode === 'signup' && (
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />
              <span>개인 맞춤형 정책 추천 알림 서비스</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />
              <span>내 일정 관리 및 북마크 기능</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from 'react';
import { 
  Search, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  User, 
  Bookmark, 
  Menu, 
  X, 
  ChevronRight,
  Filter,
  Bell,
  LogOut,
  Plus
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { ImageWithFallback } from '../ui/figma/ImageWithFallback';

const Navbar = ({ activeTab, setActiveTab, user, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈', icon: <Search size={20} /> },
    { id: 'policies', label: '정책 찾기', icon: <Filter size={20} /> },
    { id: 'community', label: '커뮤니티', icon: <MessageSquare size={20} /> },
    { id: 'calendar', label: '내 일정', icon: <CalendarIcon size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 bg-blue-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
            청바지
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                activeTab === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-blue-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User size={18} />
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-5 py-2 rounded-full bg-blue-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <Motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-100 px-4 py-4"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 text-base font-medium ${
                  activeTab === item.id ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100" />
            {!user ? (
              <button 
                onClick={onLoginClick}
                className="w-full py-3 rounded-xl bg-blue-primary text-white font-semibold"
              >
                로그인 / 회원가입
              </button>
            ) : (
              <button className="flex items-center gap-3 text-slate-500 font-medium">
                <LogOut size={20} />
                로그아웃
              </button>
            )}
          </div>
        </Motion.div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, User, Plus, Search } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const POSTS = [
  {
    id: 1,
    category: '주거',
    title: '청년 월세 지원 대상자 선정됐어요! 후기 남깁니다',
    author: '서울청년88',
    content: '서류 준비하는게 생각보다 까다로웠는데...',
    likes: 24,
    comments: 12,
    views: 156,
    time: '2시간 전'
  }
];

const Community = () => {
  return (
    <section className="py-8 bg-slate-50/50 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">청년 커뮤니티</h2>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <Plus size={20} /> 글쓰기
          </button>
        </div>
        <div className="space-y-4">
          {POSTS.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{post.category}</span>
                <span>{post.time}</span>
              </div>
              <h4 className="text-lg font-bold mb-2">{post.title}</h4>
              <p className="text-sm text-slate-500 mb-4">{post.content}</p>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">{post.author}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><ThumbsUp size={16}/> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={16}/> {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
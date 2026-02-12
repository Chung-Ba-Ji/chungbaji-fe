import React, { useState } from 'react';
import { Plus, ThumbsUp, MessageSquare } from 'lucide-react'; 
import PostList from '../components/community/PostList';
import PostDetail from '../components/community/PostDetail';
import PostForm from '../components/community/PostForm';
import { toast } from 'sonner';

const Community = ({ user }) => {
  const [view, setView] = useState('list'); // 'list', 'detail', 'write'
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setView('list');
  };

  const handleWriteSuccess = () => {
    setView('list');
    toast.success('게시글이 등록되었습니다.');
  };

  // 글쓰기 버튼 클릭 핸들러 (로그인 체크 포함)
  const handleWriteClick = () => {
    if (!user) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }
    setView('write');
  };

  return (
    <section className="py-8 bg-slate-50/50 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 섹션: 리스트 보기일 때만 제목과 글쓰기 버튼 노출 */}
        {view === 'list' && (
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">청년 커뮤니티</h2>
              <p className="text-sm text-slate-500 mt-1">다양한 청년 정책 후기와 정보를 나누어보세요.</p>
            </div>
            <button 
              onClick={handleWriteClick}
              className="bg-blue-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus size={20} /> 글쓰기
            </button>
          </div>
        )}

        {/* 뷰 전환 로직 */}
        {view === 'list' && (
          <div className="animate-in fade-in duration-300">
            <PostList
              onViewChange={setView}
              onPostClick={handlePostClick}
              user={user}
            />
          </div>
        )}

        {view === 'detail' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <PostDetail
              postId={selectedPostId}
              onBack={handleBackToList}
              user={user}
            />
          </div>
        )}

        {view === 'write' && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <PostForm
              onCancel={() => setView('list')}
              onSuccess={handleWriteSuccess}
              user={user}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
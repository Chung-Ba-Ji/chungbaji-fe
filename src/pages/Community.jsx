import React, { useState } from 'react';
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

  return (
    <section className="py-8 bg-slate-50/50 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">청년 커뮤니티</h2>
          <p className="text-slate-500 text-sm mt-1">
            자유롭게 이야기를 나누고 정보를 공유해보세요.
          </p>
        </div>

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

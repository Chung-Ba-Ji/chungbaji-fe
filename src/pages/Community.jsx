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
          <button className="bg-blue-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2">
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

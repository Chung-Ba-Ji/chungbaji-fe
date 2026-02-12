import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Plus, Search } from 'lucide-react';
import { communityApi } from '../../api/community';
import { toast } from 'sonner';

const PostList = ({ onViewChange, onPostClick, user }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');

    const handleWriteClick = () => {
        if (!user) {
            toast.error('로그인이 필요한 서비스입니다.');
            // Optional: Trigger login modal if I could access it, but here just toast
            return;
        }
        onViewChange('write');
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await communityApi.getPosts();
            // Handle pageable response structure
            if (data && data.content) {
                setPosts(data.content);
            } else if (Array.isArray(data)) {
                setPosts(data);
            } else {
                // Fallback or empty
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            // toast.error("게시글을 불러오는데 실패했습니다."); // Optional: Don't spam if backend is offline
            // Fallback to empty list or mock if desired for demo, but sticking to API for now
            // For demo purposes, if API fails, I might want to show the initial mock data from the original file? 
            // I'll stick to empty for now to be "real"
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await communityApi.searchPosts({ keyword });
            if (data && data.content) {
                setPosts(data.content);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("Search failed:", error);
            toast.error("검색에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <form onSubmit={handleSearch} className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="관심있는 내용을 검색해보세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                </form>
                <button
                    onClick={handleWriteClick}
                    className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus size={20} /> 글쓰기
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">
                    로딩중...
                </div>
            ) : posts.length > 0 ? (
                <div className="grid gap-4">
                    {posts.map(post => (
                        <div
                            key={post.postId || post.id}
                            onClick={() => onPostClick(post.postId || post.id)}
                            className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-teal-100 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                                    {post.policy ? post.policy.title : (post.category || '일반')}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : (post.time || '방금 전')}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                {post.content}
                            </p>
                            <div className="flex items-center justify-between text-slate-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-600">
                                        {post.member ? post.member.nickname : (post.author || '익명')}
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1 hover:text-slate-600">
                                        <ThumbsUp size={16} /> {0}
                                    </span>
                                    <span className="flex items-center gap-1 hover:text-slate-600">
                                        <MessageSquare size={16} /> {0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500 mb-2">등록된 게시글이 없습니다. 첫 글을 작성해보세요!</p>
                    <button
                        onClick={() => onViewChange('write')}
                        className="text-teal-600 font-bold hover:underline"
                    >
                        글쓰기
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostList;

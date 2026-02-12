import React, { useState, useEffect } from 'react';
import { communityApi } from '../../api/community';
import CommentSection from './CommentSection';
import { User, Calendar, Tag, ArrowLeft, MoreHorizontal, MessageSquare, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

const PostDetail = ({ postId, onBack, user }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const data = await communityApi.getPost(postId);
            setPost(data);
        } catch (error) {
            console.error("Failed to fetch post:", error);
            // toast.error("게시글을 불러오는데 실패했습니다.");
            // Fallback for demo? Or just show error state
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
        try {
            await communityApi.deletePost(postId);
            toast.success('게시글이 삭제되었습니다.');
            onBack();
        } catch (error) {
            console.error("Failed to delete post:", error);
            toast.error("게시글 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 text-slate-400">
                로딩중...
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-4">게시글을 찾을 수 없습니다.</p>
                <button onClick={onBack} className="text-teal-600 font-bold hover:underline">
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const isOwner = user && post.member && (user.memberId === post.member.memberId || user.id === post.member.memberId);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-slate-500 hover:text-teal-600 mb-4 transition-colors font-semibold text-sm"
                >
                    <ArrowLeft size={16} /> 목록으로
                </button>

                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">
                        {post.policy ? post.policy.title : (post.category || '자유')}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Calendar size={12} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '날짜 없음'}
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-slate-400" />
                        </div>
                        <div>
                            <span className="block font-bold text-slate-700 text-sm">
                                {post.member ? post.member.nickname : (post.author || '익명')}
                            </span>
                            <span className="text-xs text-slate-400">작성자</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="삭제"
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-none mb-12 min-h-[200px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                {post.content}
            </div>

            {/* Interaction Stats */}
            <div className="flex gap-4 text-slate-400 mb-8">
                <div className="flex items-center gap-1">
                    <ThumbsUp size={18} />
                    <span>{0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageSquare size={18} />
                    <span>0</span>
                </div>
            </div>

            {/* Comments */}
            <CommentSection postId={postId} user={user} />
        </div>
    );
};

export default PostDetail;

import React, { useState, useEffect } from 'react';
import { communityApi } from '../../api/community';
import { toast } from 'sonner';
import { User } from 'lucide-react';

const CommentSection = ({ postId, user }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            const data = await communityApi.getComments(postId);
            if (Array.isArray(data)) {
                setComments(data);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            // toast.error("댓글을 불러오는데 실패했습니다.");
            setComments([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('로그인이 필요한 서비스입니다.');
            return;
        }
        if (!content.trim()) return;

        setLoading(true);
        try {
            const commentData = {
                postId,
                content,
                memberId: user.memberId || user.id || 1,
                status: 'ACTIVE'
            };
            await communityApi.createComment(commentData);
            setContent('');
            fetchComments();
            toast.success('댓글이 등록되었습니다.');
        } catch (error) {
            console.error("Failed to create comment:", error);
            toast.error("댓글 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        try {
            await communityApi.deleteComment(commentId);
            fetchComments();
            toast.success('댓글이 삭제되었습니다.');
        } catch (error) {
            console.error("Failed to delete comment:", error);
            toast.error("댓글 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="mt-8 border-t border-slate-100 pt-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">댓글 {comments.length}</h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={user ? "댓글을 작성해보세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                    disabled={!user}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={loading || !content.trim() || !user}
                    className="bg-teal-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    등록
                </button>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
                {comments.map(comment => {
                    const isOwner = user && comment.member && (user.memberId === comment.member.memberId || user.id === comment.member.memberId);

                    return (
                        <div key={comment.commentId || comment.id} className="bg-slate-50 p-4 rounded-xl">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                        <User size={16} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-sm block text-slate-700">
                                            {comment.member ? comment.member.nickname : (comment.author || '익명')}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : '방금 전'}
                                        </span>
                                    </div>
                                </div>
                                {isOwner && (
                                    <button
                                        onClick={() => handleDelete(comment.commentId || comment.id)}
                                        className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                            <p className="text-slate-600 text-sm ml-10">
                                {comment.content}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommentSection;

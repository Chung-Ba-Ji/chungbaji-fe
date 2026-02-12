import React, { useState } from 'react';
import { communityApi } from '../../api/community';
import { toast } from 'sonner';

const PostForm = ({ onCancel, onSuccess, user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [codeId, setCodeId] = useState(''); // Category selection
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('로그인이 필요한 서비스입니다.');
            return;
        }

        if (!title.trim() || !content.trim()) {
            toast.error('제목과 내용을 모두 입력해주세요.');
            return;
        }

        if (!codeId) {
            toast.error('카테고리를 선택해주세요.');
            return;
        }

        setLoading(true);

        try {
            const postData = {
                title: title,
                content: content,
                member_id: user.member_id || user.memberId || user.id,
                code_id: parseInt(codeId, 10),
                policy_id: null,
                is_anonymous: 'N',
                status: 'ACTIVE'
            };

            // API 호출
            const response = await communityApi.createPost(postData);

            if (response) {
                toast.success('게시글이 성공적으로 등록되었습니다.');
                onSuccess(); // 목록으로 돌아가기 또는 초기화
            }
        } catch (error) {
            console.error(">>> [PostForm] 등록 실패 상세:", error);
            
            const errorMessage = error.response?.data || "게시글 등록 중 오류가 발생했습니다.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6">새 게시글 작성</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 카테고리 선택 */}
                <div>
                    <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-2">
                        카테고리
                    </label>
                    <select
                        id="category"
                        value={codeId}
                        onChange={(e) => setCodeId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-800 bg-white"
                    >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="1">주거</option>
                        <option value="2">취업</option>
                        <option value="3">금융</option>
                        <option value="4">복지</option>
                        <option value="5">교육</option>
                        <option value="6">창업</option>
                    </select>
                </div>

                {/* 제목 입력 */}
                <div>
                    <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-2">
                        제목
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해주세요"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-800"
                    />
                </div>

                {/* 내용 입력 */}
                <div>
                    <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-2">
                        내용
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 자유롭게 작성해주세요"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all min-h-[300px] resize-none"
                    />
                </div>

                {/* 버튼 영역 */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 rounded-xl text-slate-500 hover:bg-slate-50 font-bold transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-teal-600/20"
                    >
                        {loading ? '등록 중...' : '등록하기'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
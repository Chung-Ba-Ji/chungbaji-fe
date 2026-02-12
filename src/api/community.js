import api from './axios'; 

export const communityApi = {
    // === Posts (게시글) ===
    
    // 게시글 목록 조회
    getPosts: async ({ page = 0, size = 10, sort = 'createdAt,desc' } = {}) => {
        const response = await api.get('/api/community/posts', {
            params: { page, size, sort }
        });
        return response.data;
    },

    // 게시글 상세 조회
    getPost: async (postId) => {
        const response = await api.get(`/api/community/posts/${postId}`);
        return response.data;
    },

    // 게시글 생성
    createPost: async (postData) => {
        const response = await api.post('/api/community/posts', postData);
        return response.data;
    },

    // 게시글 수정
    updatePost: async (postId, postData) => {
        const response = await api.put(`/api/community/posts/${postId}`, postData);
        return response.data;
    },

    // 게시글 삭제
    deletePost: async (postId) => {
        const response = await api.delete(`/api/community/posts/${postId}`);
        return response.data;
    },

    // 게시글 검색
    searchPosts: async ({ keyword, page = 0, size = 10, sort = 'createdAt,desc' }) => {
        const response = await api.get('/api/community/search', {
            params: { keyword, page, size, sort }
        });
        return response.data;
    },

    // Comments

    // 댓글 목록 조회
    getComments: async (postId) => {
        const response = await api.get(`/api/community/posts/${postId}/comments`);
        return response.data;
    },

    // 댓글 작성
    createComment: async (commentData) => {
        const response = await api.post('/api/community/comments', commentData);
        return response.data;
    },

    // 댓글 수정
    updateComment: async (commentId, commentData) => {
        const response = await api.put(`/api/community/comments/${commentId}`, commentData);
        return response.data;
    },

    // 댓글 삭제
    deleteComment: async (commentId) => {
        const response = await api.delete(`/api/community/comments/${commentId}`);
        return response.data;
    }
};
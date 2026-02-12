const BASE_URL = '/api'; // Adjust if using a proxy in vite.config.js, otherwise full URL

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // content is not json
        }
        throw new Error(errorMessage);
    }
    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return null;
};

const getHeaders = ({ includeAuth = true, contentType = 'application/json' } = {}) => {
    const headers = {};
    if (contentType) {
        headers['Content-Type'] = contentType;
    }
    if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
};

export const communityApi = {
    // Auth
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/members/login`, {
            method: 'POST',
            headers: getHeaders({ includeAuth: false }),
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    signUp: async (userData) => {
        const response = await fetch(`${BASE_URL}/members/signUp`, {
            method: 'POST',
            headers: getHeaders({ includeAuth: false }),
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    logout: async () => {
        // Optional: Call server logout if needed, but mainly clear client state
        // Server endpoint: /api/members/logout
        const token = localStorage.getItem('token');
        if (token) {
            await fetch(`${BASE_URL}/members/logout`, {
                method: 'POST',
                headers: getHeaders({ includeAuth: true, contentType: null }),
            }).catch(e => console.warn("Logout failed", e));
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Posts
    getPosts: async ({ page = 0, size = 10, sort = 'createdAt,desc' } = {}) => {
        const params = new URLSearchParams({ page, size, sort });
        // Use auth if available (for ownership checks etc if needed), but usually public
        // If backend fails on anon for public endpoints, we might need to adjust, but usually GET is public
        // Based on logs, GET was also rejected? "Securing GET /api/community/posts... not authorizated"
        // If GET requires auth, we should send it if we have it.
        const response = await fetch(`${BASE_URL}/community/posts?${params}`, {
            headers: getHeaders({ includeAuth: true, contentType: null })
        });
        return handleResponse(response);
    },

    getPost: async (postId) => {
        const response = await fetch(`${BASE_URL}/community/posts/${postId}`, {
            headers: getHeaders({ includeAuth: true, contentType: null })
        });
        return handleResponse(response);
    },

    createPost: async (postData) => {
        const response = await fetch(`${BASE_URL}/community/posts`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(postData),
        });
        return handleResponse(response);
    },

    updatePost: async (postId, postData) => {
        const response = await fetch(`${BASE_URL}/community/posts/${postId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(postData),
        });
        return handleResponse(response);
    },

    deletePost: async (postId) => {
        const response = await fetch(`${BASE_URL}/community/posts/${postId}`, {
            method: 'DELETE',
            headers: getHeaders({ contentType: null }),
        });
        return handleResponse(response);
    },

    searchPosts: async ({ keyword, page = 0, size = 10, sort = 'createdAt,desc' }) => {
        const params = new URLSearchParams({ keyword, page, size, sort });
        const response = await fetch(`${BASE_URL}/community/search?${params}`, {
            headers: getHeaders({ includeAuth: true, contentType: null })
        });
        return handleResponse(response);
    },

    // Comments
    getComments: async (postId) => {
        const response = await fetch(`${BASE_URL}/community/posts/${postId}/comments`, {
            headers: getHeaders({ includeAuth: true, contentType: null })
        });
        return handleResponse(response);
    },

    createComment: async (commentData) => {
        const response = await fetch(`${BASE_URL}/community/comments`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(commentData),
        });
        return handleResponse(response);
    },

    updateComment: async (commentId, commentData) => {
        const response = await fetch(`${BASE_URL}/community/comments/${commentId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(commentData),
        });
        return handleResponse(response);
    },

    deleteComment: async (commentId) => {
        const response = await fetch(`${BASE_URL}/community/comments/${commentId}`, {
            method: 'DELETE',
            headers: getHeaders({ contentType: null }),
        });
        return handleResponse(response);
    },
};

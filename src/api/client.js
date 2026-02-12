import axios from 'axios';

// Create axios instance
const client = axios.create({
    baseURL: 'http://localhost:5001/api', // Adjust if needed
    withCredentials: true, // Important for cookies (refresh token)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for refreshing token
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't retried yet
        // Also skip if the request was specifically for refreshing the token (to avoid loop)
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh-token') &&
            !originalRequest.url.includes('/auth/login')
        ) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const res = await client.get('/auth/refresh-token');

                if (res.data.success) {
                    const { token } = res.data;

                    // Update local storage
                    localStorage.setItem('token', token);

                    // Update authorization header for the failed request
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    // Update default header for future requests
                    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Retry the original request
                    return client(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed (token expired or invalid)
                console.error('Session expired, redirecting to login...', refreshError);

                // Clear auth data
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Dispatch storage event to sync tabs/components
                window.dispatchEvent(new Event('storage'));

                // Redirect to login page
                window.location.href = '/parent-login'; // Default to a login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default client;

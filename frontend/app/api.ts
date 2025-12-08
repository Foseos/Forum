import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: `${API_URL}/authentification/`
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Fonctions d'authentification
export const authAPI = {
    register: (username: string, email: string, password: string) =>
        api.post('/register/', { username, email, password }),

    login: (username: string, password: string) =>
        api.post('/login/', { username, password }),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default api;
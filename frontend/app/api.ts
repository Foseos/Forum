import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Instance axios pour l'authentification
const authApi = axios.create({
    baseURL: `${API_URL}/authentification/`
});

// Instance axios pour les topics
const topicsApi = axios.create({
    baseURL: `${API_URL}/topics/`
});

// Intercepteur pour ajouter le token aux requêtes d'authentification
authApi.interceptors.request.use(
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

// Intercepteur pour ajouter le token aux requêtes de topics
topicsApi.interceptors.request.use(
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
        authApi.post('/register/', { username, email, password }),

    login: (username: string, password: string) =>
        authApi.post('/login/', { username, password }),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Récupère l'utilisateur connecté depuis le localStorage (rapide mais peut être obsolète)
    getCurrentUserLocal: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Récupère l'utilisateur connecté depuis l'API (toujours à jour)
    getCurrentUser: () => authApi.get('/me/'),

    // Met à jour le profil de l'utilisateur connecté
    updateProfile: (data: any) => authApi.put('/profile/', data),

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Fonctions pour les topics
export const topicsAPI = {
    // Liste tous les topics
    getTopics: () => topicsApi.get('/'),

    // Récupère un topic spécifique avec ses réponses
    getTopic: (id: number) => topicsApi.get(`/${id}/`),

    // Crée un nouveau topic (authentification requise)
    createTopic: (title: string, content: string, category: string) =>
        topicsApi.post('/', { title, content, category }),

    // Met à jour un topic (auteur seulement)
    updateTopic: (id: number, title: string, content: string, category: string) =>
        topicsApi.put(`/${id}/`, { title, content, category }),

    // Supprime un topic (auteur seulement)
    deleteTopic: (id: number) => topicsApi.delete(`/${id}/`),

    // Récupère les réponses d'un topic
    getReplies: (topicId: number) => topicsApi.get(`/${topicId}/replies/`),

    // Crée une réponse à un topic (authentification requise)
    createReply: (topicId: number, content: string) =>
        topicsApi.post(`/${topicId}/replies/`, { content }),

    // Met à jour une réponse (auteur seulement)
    updateReply: (id: number, content: string) =>
        topicsApi.put(`/replies/${id}/`, { content }),

    // Supprime une réponse (auteur seulement)
    deleteReply: (id: number) => topicsApi.delete(`/replies/${id}/`)
};

// Instance axios pour la recherche
const searchApi = axios.create({
    baseURL: `${API_URL}/search/`
});

// Intercepteur pour ajouter le token aux requêtes de recherche
searchApi.interceptors.request.use(
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

// Fonctions pour la recherche
export const searchAPI = {
    // Recherche globale (topics + utilisateurs)
    globalSearch: (query: string) => searchApi.get('/', { params: { q: query } }),
    // Récupérer les statistiques du forum
    getForumStats: () => searchApi.get('/stats/')
};

export default authApi;
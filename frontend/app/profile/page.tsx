'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string | null;
  date_inscription: string;
  nombre_posts: number;
}

interface Topic {
  id: number;
  title: string;
  category: string;
  reply_count: number;
  created_at: string;
}

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentPosts, setRecentPosts] = useState<Topic[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchUserTopics();
  }, []);

  const fetchProfile = async () => {
    try {
      const { authAPI } = await import('../api');
      const response = await authAPI.getCurrentUser();
      setProfile(response.data);
      setFormData({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        email: response.data.email || '',
        bio: response.data.bio || ''
      });
      setLoading(false);
    } catch (err: any) {
      console.error('Erreur lors du chargement du profil:', err);
      if (err.response?.status === 401) {
        // Non authentifié, rediriger vers login
        router.push('/auth/login');
      } else {
        setError('Impossible de charger le profil');
        setLoading(false);
      }
    }
  };

  const fetchUserTopics = async () => {
    try {
      const { topicsAPI, authAPI } = await import('../api');
      const userResponse = await authAPI.getCurrentUser();
      const topicsResponse = await topicsAPI.getTopics();

      // Filtrer les topics de l'utilisateur connecté
      const userTopics = topicsResponse.data.filter(
        (topic: any) => topic.author === userResponse.data.id
      );
      setRecentPosts(userTopics.slice(0, 5)); // Garder les 5 plus récents
    } catch (err) {
      console.error('Erreur lors du chargement des topics:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const formatDateRelative = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return date.toLocaleDateString('fr-FR');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { authAPI } = await import('../api');

      // Si un fichier avatar est sélectionné, envoyer en FormData
      if (avatarFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('avatar', avatarFile);

        const response = await authAPI.updateProfile(formDataToSend);
        setProfile(response.data);
      } else {
        // Sinon, envoyer en JSON
        const response = await authAPI.updateProfile(formData);
        setProfile(response.data);
      }

      setIsEditing(false);
      setSubmitting(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError('Erreur lors de la mise à jour du profil');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
          <p className="mt-4">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Profil non trouvé'}</p>
          <Link
            href="/topics"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 font-semibold inline-block"
          >
            Retour aux topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-48 -mt-48"></div>
          <div className="relative px-8 py-10">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.username}
                    className="w-32 h-32 rounded-2xl object-cover shadow-2xl shadow-blue-500/50 ring-4 ring-gray-900"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/50 ring-4 ring-gray-900">
                    {profile.username[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-2">
                      {profile.username}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {profile.bio || 'Aucune biographie'}
                    </p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </button>
                  )}
                </div>
                <div className="flex gap-8 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{profile.nombre_posts}</p>
                      <p className="text-sm text-gray-400">Posts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">Membre depuis</p>
                      <p className="text-sm text-gray-400">{formatDate(profile.date_inscription)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 mb-8">
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-gray-700/60">
              <h2 className="text-2xl font-bold text-white">
                Modifier le profil
              </h2>
            </div>
            {error && (
              <div className="mx-8 mt-5 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="px-8 py-8">
              <div className="space-y-6">
                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Photo de profil
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Aperçu"
                          className="w-24 h-24 rounded-xl object-cover shadow-lg shadow-blue-500/50 ring-2 ring-blue-500"
                        />
                      ) : profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.username}
                          className="w-24 h-24 rounded-xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          {profile.username[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer transition-all"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        PNG, JPG ou GIF. Taille maximale : 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Biographie
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      first_name: profile.first_name || '',
                      last_name: profile.last_name || '',
                      email: profile.email || '',
                      bio: profile.bio || ''
                    });
                    setAvatarFile(null);
                    setAvatarPreview(null);
                  }}
                  className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Posts */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-gray-700/60">
            <h2 className="text-2xl font-bold text-white">Posts récents</h2>
          </div>
          {recentPosts.length === 0 ? (
            <div className="px-8 py-12 text-center text-gray-400">
              <p>Aucun post pour le moment. Créez votre premier topic !</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/60">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/topics/${post.id}`}
                  className="group block px-8 py-6 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm shadow-blue-500/50">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-400">{formatDateRelative(post.created_at)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.reply_count} réponse{post.reply_count > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

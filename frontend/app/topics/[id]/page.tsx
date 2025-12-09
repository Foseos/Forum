'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

interface Reply {
  id: number;
  author: number;
  author_username: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  topic: number;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  category: string;
  author: number;
  author_username: string;
  created_at: string;
  updated_at: string;
  views: number;
  is_pinned: boolean;
  is_closed: boolean;
  reply_count: number;
  replies: Reply[];
}

export default function TopicDetail() {
  const params = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTopic();
  }, [params.id]);

  const fetchTopic = async () => {
    try {
      const { topicsAPI } = await import('../../api');
      const response = await topicsAPI.getTopic(Number(params.id));
      setTopic(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error('Erreur lors du chargement du topic:', err);
      setError('Impossible de charger le topic');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString('fr-FR');
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const { topicsAPI } = await import('../../api');
      await topicsAPI.createReply(Number(params.id), newReply);
      setNewReply('');
      // Recharger le topic pour afficher la nouvelle réponse
      await fetchTopic();
      setSubmitting(false);
    } catch (err: any) {
      console.error('Erreur lors de la création de la réponse:', err);
      if (err.response?.status === 401) {
        setError('Vous devez être connecté pour répondre');
      } else {
        setError('Erreur lors de la publication de la réponse');
      }
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
          <p className="mt-4">Chargement du topic...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Topic non trouvé'}</p>
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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Accueil
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/topics" className="hover:text-blue-400 transition-colors">
            Discussions
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white font-medium">{topic.title}</span>
        </nav>

        {/* Topic Post */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 mb-6">
          <div className="px-8 py-6 border-b border-gray-700/60">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm shadow-blue-500/50">
                {topic.category}
              </span>
              {topic.is_pinned && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Épinglé
                </span>
              )}
              {topic.is_closed && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                  Fermé
                </span>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{topic.views} vues</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">{topic.title}</h1>
          </div>

          <div className="px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/50">
                  {topic.author_username[0].toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-semibold text-white text-lg">{topic.author_username}</span>
                  <span className="text-sm text-gray-400">{formatDate(topic.created_at)}</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap">{topic.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {topic.replies.length} réponse{topic.replies.length > 1 ? 's' : ''}
          </h2>

          {topic.replies.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 px-8 py-12 text-center text-gray-400">
              <p>Aucune réponse pour le moment. Soyez le premier à répondre !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topic.replies.map((reply: Reply) => (
                <div key={reply.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60">
                  <div className="px-8 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
                          {reply.author_username[0].toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-white">{reply.author_username}</span>
                          <span className="text-sm text-gray-400">{formatDate(reply.created_at)}</span>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60">
          <div className="px-8 py-5 border-b border-gray-700/60">
            <h3 className="text-xl font-bold text-white">Ajouter une réponse</h3>
          </div>
          {error && (
            <div className="mx-8 mt-5 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmitReply} className="px-8 py-6">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Écrivez votre réponse..."
              required
              disabled={submitting || topic.is_closed}
            />
            <div className="mt-5 flex justify-end gap-3">
              <Link
                href="/topics"
                className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                Retour
              </Link>
              <button
                type="submit"
                disabled={submitting || topic.is_closed}
                className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Publication...' : 'Publier'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

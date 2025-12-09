'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Topic {
  id: number;
  title: string;
  author_username: string;
  category: string;
  reply_count: number;
  views: number;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_closed: boolean;
}

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const categories = ['Tous', 'general', 'questions', 'aide', 'annonces'];

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const { topicsAPI } = await import('../api');
      const response = await topicsAPI.getTopics();
      setTopics(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error('Erreur lors du chargement des topics:', err);
      setError('Impossible de charger les topics');
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

    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString('fr-FR');
  };

  const filteredTopics = selectedCategory === 'Tous'
    ? topics
    : topics.filter(topic => topic.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Navbar showNewTopicButton={true} />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">Discussions</h1>
            <p className="mt-2 text-gray-400">Parcourez et participez aux discussions</p>
          </div>
          <Link
            href="/topics/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouveau topic
          </Link>
        </div>

        {/* Categories Filter */}
        <div className="mb-6 flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Topics List */}
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700/60 overflow-hidden">
          {loading ? (
            <div className="px-8 py-12 text-center text-gray-400">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4">Chargement des topics...</p>
            </div>
          ) : error ? (
            <div className="px-8 py-12 text-center text-red-400">
              <p>{error}</p>
            </div>
          ) : filteredTopics.length === 0 ? (
            <div className="px-8 py-12 text-center text-gray-400">
              <p>Aucun topic pour le moment. Soyez le premier à en créer un !</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/60">
              {filteredTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="group block hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-200"
                >
                  <div className="px-8 py-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
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
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Par <span className="font-medium text-gray-300">{topic.author_username}</span>
                        </p>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-sm text-gray-400 mb-2">
                          {formatDate(topic.updated_at)}
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{topic.reply_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{topic.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-all">
              Précédent
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 rounded-lg text-sm font-medium text-white shadow-lg shadow-blue-500/50">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-all">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-all">
              3
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-all">
              Suivant
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

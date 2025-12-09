'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Topic {
  id: number;
  title: string;
  content: string;
  category: string;
  author_name: string;
  reply_count: number;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  bio: string;
  avatar: string | null;
  nombre_posts: number;
}

interface SearchResults {
  topics: Topic[];
  users: User[];
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResults>({ topics: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'users'>('topics');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults({ topics: [], users: [] });
      return;
    }

    setLoading(true);
    try {
      const { searchAPI } = await import('../api');

      // Recherche globale en un seul appel
      const response = await searchAPI.globalSearch(searchTerm);

      setResults({
        topics: response.data.topics,
        users: response.data.users
      });
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setResults({ topics: [], users: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const formatDate = (dateString: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des topics ou des utilisateurs..."
                className="w-full px-6 py-4 pl-14 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </div>

        {/* Search Info */}
        {query && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Résultats pour "{query}"
            </h1>
            <p className="text-gray-400">
              {results.topics.length} topic{results.topics.length > 1 ? 's' : ''} et {results.users.length} utilisateur{results.users.length > 1 ? 's' : ''} trouvé{results.users.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Tabs */}
        {query && (
          <div className="flex gap-4 mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'topics'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Topics ({results.topics.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'users'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Utilisateurs ({results.users.length})
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-400">Recherche en cours...</p>
          </div>
        )}

        {/* Results */}
        {!loading && query && (
          <>
            {/* Topics Results */}
            {activeTab === 'topics' && (
              <div className="space-y-4">
                {results.topics.length === 0 ? (
                  <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700">
                    <svg
                      className="mx-auto w-16 h-16 text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-400">Aucun topic trouvé</p>
                  </div>
                ) : (
                  results.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.id}`}
                      className="block bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                              {topic.category}
                            </span>
                            <span className="text-sm text-gray-400">
                              par {topic.author_name}
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-400">
                              {formatDate(topic.created_at)}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {topic.title}
                          </h3>
                          <p className="text-gray-400 line-clamp-2">
                            {topic.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          <span>
                            {topic.reply_count} réponse{topic.reply_count > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* Users Results */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                {results.users.length === 0 ? (
                  <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700">
                    <svg
                      className="mx-auto w-16 h-16 text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-400">Aucun utilisateur trouvé</p>
                  </div>
                ) : (
                  results.users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.username}
                              className="w-16 h-16 rounded-xl object-cover shadow-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                              {user.username[0]}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {user.username}
                          </h3>
                          <p className="text-gray-400 mb-2">
                            {user.bio || 'Aucune biographie'}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
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
                                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                              </svg>
                              <span>{user.nombre_posts} posts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!query && !loading && (
          <div className="text-center py-12">
            <svg
              className="mx-auto w-20 h-20 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">
              Recherchez des topics ou des utilisateurs
            </h2>
            <p className="text-gray-400">
              Utilisez la barre de recherche ci-dessus pour commencer
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Topic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
}

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      title: 'Bienvenue sur le forum !',
      author: 'Admin',
      category: 'Général',
      replies: 5,
      views: 120,
      lastActivity: 'Il y a 2 heures',
    },
    {
      id: 2,
      title: 'Comment créer un nouveau topic ?',
      author: 'User123',
      category: 'Questions',
      replies: 3,
      views: 45,
      lastActivity: 'Il y a 5 heures',
    },
    {
      id: 3,
      title: 'Problème de connexion',
      author: 'John',
      category: 'Aide',
      replies: 8,
      views: 67,
      lastActivity: 'Il y a 1 jour',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const categories = ['Tous', 'Général', 'Questions', 'Aide'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <header className="backdrop-blur-sm bg-gray-900/80 border-b border-gray-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Forum
              </span>
            </Link>
            <div className="flex gap-3">
              <Link
                href="/profile"
                className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Profil
              </Link>
              <button className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

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
          <div className="divide-y divide-gray-700/60">
            {topics.map((topic) => (
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
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Par <span className="font-medium text-gray-300">{topic.author}</span>
                      </p>
                    </div>
                    <div className="ml-6 text-right">
                      <div className="text-sm text-gray-400 mb-2">
                        {topic.lastActivity}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{topic.replies}</span>
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

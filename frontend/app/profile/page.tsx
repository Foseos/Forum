'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: 'UserExample',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Passionné de technologie et de discussions enrichissantes.',
    memberSince: 'Janvier 2024',
    postsCount: 42,
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const recentPosts = [
    {
      id: 1,
      title: 'Comment débuter en programmation ?',
      category: 'Questions',
      replies: 5,
      createdAt: 'Il y a 2 jours',
    },
    {
      id: 2,
      title: 'Présentation',
      category: 'Général',
      replies: 12,
      createdAt: 'Il y a 1 semaine',
    },
  ];

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
                href="/topics"
                className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Discussions
              </Link>
              <button className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-48 -mt-48"></div>
          <div className="relative px-8 py-10">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/50 ring-4 ring-gray-900">
                  {profile.username[0]}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-2">
                      {profile.username}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {profile.bio}
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
                      <p className="text-2xl font-bold text-white">{profile.postsCount}</p>
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
                      <p className="text-sm text-gray-400">{profile.memberSince}</p>
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
            <form onSubmit={handleSubmit} className="px-8 py-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
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
                    setFormData(profile);
                  }}
                  className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
                >
                  Enregistrer
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
                      <span className="text-sm text-gray-400">{post.createdAt}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.replies} réponses</span>
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
        </div>
      </main>
    </div>
  );
}

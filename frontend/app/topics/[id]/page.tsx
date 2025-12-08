'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export default function TopicDetail() {
  const params = useParams();
  const [newReply, setNewReply] = useState('');

  const topic = {
    id: params.id,
    title: 'Bienvenue sur le forum !',
    author: 'Admin',
    category: 'Général',
    content:
      'Bonjour à tous et bienvenue sur notre nouveau forum ! N\'hésitez pas à vous présenter et à poser vos questions. Notre communauté est là pour vous aider.',
    createdAt: 'Il y a 2 heures',
    views: 120,
  };

  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      author: 'User123',
      content: 'Merci pour l\'accueil ! Heureux de rejoindre cette communauté.',
      createdAt: 'Il y a 1 heure',
      likes: 3,
    },
    {
      id: 2,
      author: 'John',
      content: 'Super initiative ! J\'ai hâte de participer aux discussions.',
      createdAt: 'Il y a 45 minutes',
      likes: 1,
    },
  ]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim()) {
      const reply: Reply = {
        id: replies.length + 1,
        author: 'Utilisateur actuel',
        content: newReply,
        createdAt: 'À l\'instant',
        likes: 0,
      };
      setReplies([...replies, reply]);
      setNewReply('');
    }
  };

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
                  {topic.author[0]}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-semibold text-white text-lg">{topic.author}</span>
                  <span className="text-sm text-gray-400">{topic.createdAt}</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">{topic.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {replies.length} réponse{replies.length > 1 ? 's' : ''}
          </h2>

          <div className="space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60">
                <div className="px-8 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
                        {reply.author[0]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-semibold text-white">{reply.author}</span>
                        <span className="text-sm text-gray-400">{reply.createdAt}</span>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{reply.content}</p>
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
                        <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                          Répondre
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60">
          <div className="px-8 py-5 border-b border-gray-700/60">
            <h3 className="text-xl font-bold text-white">Ajouter une réponse</h3>
          </div>
          <form onSubmit={handleSubmitReply} className="px-8 py-6">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Écrivez votre réponse..."
              required
            />
            <div className="mt-5 flex justify-end gap-3">
              <Link
                href="/topics"
                className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200"
              >
                Publier
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

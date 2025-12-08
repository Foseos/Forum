import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <header className="backdrop-blur-sm bg-gray-900/80 border-b border-gray-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Forum
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/auth/login"
                className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Connexion
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Bienvenue dans notre communauté
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Rejoignez des milliers de membres pour partager vos idées,
              poser des questions et enrichir vos connaissances
            </p>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Explorer les discussions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Membres actifs</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">1,234</p>
            </div>
          </div>

          <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Discussions</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">567</p>
            </div>
          </div>

          <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Messages</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">8,901</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/60 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-gray-700/60">
            <h2 className="text-2xl font-bold text-white">Catégories populaires</h2>
          </div>
          <div className="divide-y divide-gray-700/60">
            <Link href="/topics" className="group flex items-center gap-4 px-8 py-6 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">Général</h3>
                <p className="text-sm text-gray-400">Discussions générales et actualités de la communauté</p>
              </div>
              <svg className="w-6 h-6 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link href="/topics" className="group flex items-center gap-4 px-8 py-6 hover:bg-gradient-to-r hover:from-indigo-900/20 hover:to-purple-900/20 transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">Questions</h3>
                <p className="text-sm text-gray-400">Posez vos questions et obtenez des réponses d&apos;experts</p>
              </div>
              <svg className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link href="/topics" className="group flex items-center gap-4 px-8 py-6 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">Aide & Support</h3>
                <p className="text-sm text-gray-400">Assistance technique et résolution de problèmes</p>
              </div>
              <svg className="w-6 h-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-sm bg-gray-900/60 border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2024 Forum. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

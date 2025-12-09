'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '../api';
import { APP_CONFIG } from '../config';

interface NavbarProps {
    showNewTopicButton?: boolean;
    forumName?: string;
}

export default function Navbar({ showNewTopicButton = false, forumName = APP_CONFIG.forumName }: NavbarProps) {
    const router = useRouter();

    const handleLogout = () => {
        authAPI.logout();
        router.push('/login');
    };

    return (
        <header className="backdrop-blur-sm bg-gray-900/80 border-b border-gray-800/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {forumName}
                        </span>
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/topics"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-blue-400 font-medium transition-all duration-200 border border-blue-500/30"
                        >
                            Topics
                        </Link>
                        {showNewTopicButton && (
                            <Link
                                href="/topics/new"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 font-medium transition-all duration-200 border border-green-500/30"
                            >
                                Nouveau topic
                            </Link>
                        )}
                        <Link
                            href="/profile"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-400 font-medium transition-all duration-200 border border-purple-500/30"
                        >
                            Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 text-red-400 font-medium transition-all duration-200 border border-red-500/30"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

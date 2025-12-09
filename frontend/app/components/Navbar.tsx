'use client';

import { useState } from 'react';
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
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        authAPI.logout();
        router.push('/login');
    };

    return (
        <header className="backdrop-blur-sm bg-gray-900/80 border-b border-gray-800/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo et nom du forum */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {forumName}
                        </span>
                    </Link>

                    {/* Navigation principale */}
                    <div className="flex items-center gap-3">
                        {/* Bouton Rechercher - avec icône uniquement */}
                        <Link
                            href="/search"
                            className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-cyan-400 transition-all duration-200 border border-gray-700/50 hover:border-cyan-500/30"
                            title="Rechercher"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>

                        {/* Bouton Topics */}
                        <Link
                            href="/topics"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-blue-400 font-medium transition-all duration-200 border border-blue-500/30"
                        >
                            Topics
                        </Link>

                        {/* Bouton Nouveau Topic (conditionnel) */}
                        {showNewTopicButton && (
                            <Link
                                href="/topics/new"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                            >
                                + Nouveau
                            </Link>
                        )}

                        {/* Menu utilisateur avec dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-purple-400 transition-all duration-200 border border-gray-700/50 hover:border-purple-500/30"
                                title="Menu utilisateur"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {showUserMenu && (
                                <>
                                    {/* Overlay pour fermer le menu */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />

                                    {/* Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1 z-50">
                                        <Link
                                            href="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gray-700 hover:text-purple-400 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mon Profil
                                        </Link>

                                        <div className="border-t border-gray-700 my-1"></div>

                                        <button
                                            onClick={() => {
                                                setShowUserMenu(false);
                                                handleLogout();
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors text-left"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Déconnexion
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

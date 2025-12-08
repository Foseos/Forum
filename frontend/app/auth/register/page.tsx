'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const { authAPI } = await import('../../api');
      const response = await authAPI.register(
        formData.username,
        formData.email,
        formData.password
      );

      if (response.data.token) {
        // Stocker le token et les informations utilisateur
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/topics');
      } else {
        setError('Une erreur est survenue lors de l\'inscription');
      }
    } catch (err: any) {
      if (err.response?.data?.username) {
        setError('Ce nom d\'utilisateur est déjà utilisé');
      } else if (err.response?.data?.email) {
        setError('Cette adresse email est déjà utilisée');
      } else if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Erreur de connexion au serveur');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo & Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Forum
          </span>
        </Link>
        <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-3">
          Créer un compte
        </h2>
        <p className="text-center text-gray-400">
          Déjà membre ?{' '}
          <Link href="/auth/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Se connecter
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/60 py-10 px-8 sm:px-12">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-4 py-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                Nom d&apos;utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Choisissez un nom d'utilisateur"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Minimum 6 caractères"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    S'inscrire
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

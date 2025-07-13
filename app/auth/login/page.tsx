// app/auth/login/page.tsx
// Página para login. Redirige a dashboard cuando user se actualiza después de login exitoso. Estilo moderno con gradient y animaciones.

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Inicia Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 hover:shadow-lg transition duration-300"
          >
            {loading ? 'Cargando...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-4 text-center flex items-center justify-center"><span className="mr-2">❌</span>{error}</p>}
        </form>
        <p className="text-center mt-6 text-gray-600">
          ¿No tienes cuenta? <a href="/auth/signup" className="text-indigo-600 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
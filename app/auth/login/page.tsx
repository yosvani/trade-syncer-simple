// app/auth/login/page.tsx
// Página para login. Redirige a dashboard cuando user se actualiza después de login exitoso.

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Para redirect
import { useAuth } from '../../../hooks/useAuth';  // Ajusta la ruta si es diferente

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, user } = useAuth();  // Incluye user para vigilar
  const router = useRouter();

  // Redirect auto cuando user se sets después de login
  useEffect(() => {
    if (user) {
      router.push('/dashboard');  // Redirige si logueado
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);  // Llama login, el useEffect maneja el redirect
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full mb-2 p-2 border"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="block w-full mb-2 p-2 border"
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2">
          {loading ? 'Cargando...' : 'Login'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
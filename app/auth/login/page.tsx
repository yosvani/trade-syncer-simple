// app/auth/login/page.tsx
// Página para login. Usa hook auth y trades modularmente.

'use client';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTrades } from '../../../hooks/useTrades';  // Asegúrate de este import

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  // Nuevo: Flag para post-login
  const { login, loading, error } = useAuth();
  const { trades, error: tradesError } = useTrades();  // Mueve aquí: Nivel superior

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    setLoggedIn(true);  // Activa flag después de login
  };

  // Test post-login: Imprime trades si loggedIn
  if (loggedIn) {
    console.log('Trades después de login:', trades);
    if (tradesError) console.error('Error en trades:', tradesError);
  }

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
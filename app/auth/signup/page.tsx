// app/auth/signup/page.tsx
// Página para registro. Usa hook auth para separación de lógica.

'use client'; // Marca como client-side (necesario para forms interactivos)

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loading, error } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Regístrate</h2>
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
          {loading ? 'Cargando...' : 'Signup'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
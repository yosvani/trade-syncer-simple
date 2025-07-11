// hooks/useAuth.ts
// Hook personalizado para manejar autenticación. Modular: Solo auth lógica, reusable en cualquier componente.
// Usa Supabase client; maneja estados y errores sin afectar global.

import { useState } from 'react';
import { supabase } from '../lib/supabase-db';
import { User, AuthError } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para signup
  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supError } = await supabase.auth.signUp({ email, password });
      if (supError) throw supError;
      setUser(data.user as User);
    } catch (err) {
      setError((err as AuthError).message || 'Error en signup');
    } finally {
      setLoading(false);
    }
  };

  // Función para login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supError } = await supabase.auth.signInWithPassword({ email, password });
      if (supError) throw supError;
      setUser(data.user as User);
    } catch (err) {
      setError((err as AuthError).message || 'Error en login');
    } finally {
      setLoading(false);
    }
  };

  // Función para logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, error, signup, login, logout };
};
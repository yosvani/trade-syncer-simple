// hooks/useAuth.ts
// Hook para auth. Modular: Carga sesión automática al inicio y escucha cambios.
// Esto previene redirects erróneos en páginas protegidas.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-db';
import { User, AuthError } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // Inicial true para loading inicial
  const [error, setError] = useState<string | null>(null);

  // Carga sesión inicial y escucha cambios de auth
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user as User || null);
      setLoading(false);
    };

    getSession();

    // Listener para cambios (ej. login/logout en otras tabs)
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user as User || null);
    });

    return () => listener.subscription.unsubscribe();  // Limpia listener
  }, []);

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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, error, signup, login, logout };
};
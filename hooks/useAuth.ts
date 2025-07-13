// hooks/useAuth.ts
// Hook para auth con trial 7 días. Checa expiration y set flag.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-db';
import { User, AuthError } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trialExpired, setTrialExpired] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user as User | null;
      setUser(currentUser);
      if (currentUser) {
        const { data: profile } = await supabase.from('profiles').select('trial_start').eq('id', currentUser.id).single();
        if (profile && profile.trial_start) {
          const trialEnd = new Date(profile.trial_start);
          trialEnd.setDate(trialEnd.getDate() + 7);
          if (new Date() > trialEnd) setTrialExpired(true);
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user as User | null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supError } = await supabase.auth.signUp({ email, password });
      if (supError) throw supError;
      setUser(data.user as User);
      // Set trial_start
      if (data.user) {
        await supabase.from('profiles').insert({ id: data.user.id, trial_start: new Date().toISOString() });
      }
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
    setTrialExpired(false);
  };

  return { user, loading, error, signup, login, logout, trialExpired };
};
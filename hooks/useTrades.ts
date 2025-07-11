// hooks/useTrades.ts
// Hook para manejar trades en DB. Modular: Solo DB operaciones, reusable, con real-time suscripción.
// No afecta auth o UI; maneja errores localmente.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-db';
import { Trade } from '../types';

export const useTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch inicial de trades
  const fetchTrades = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supError } = await supabase.from('trades').select('*').order('created_at', { ascending: false });
      if (supError) throw supError;
      setTrades(data as Trade[]);
    } catch (err) {
      setError((err as any).message || 'Error fetching trades');
    } finally {
      setLoading(false);
    }
  };

  // Insertar nuevo trade
  const addTrade = async (instrument: string, amount: number, type: 'buy' | 'sell') => {
    try {
      const { error: supError } = await supabase.from('trades').insert({ instrument, amount, type });
      if (supError) throw supError;
      fetchTrades();  // Refresca lista
    } catch (err) {
      setError((err as any).message || 'Error adding trade');
    }
  };

  // Real-time suscripción (actualiza auto cuando hay cambios)
  useEffect(() => {
    fetchTrades();  // Carga inicial
    const subscription = supabase
      .channel('trades-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trades' }, () => fetchTrades())
      .subscribe();

    return () => { subscription.unsubscribe(); };  // Limpia al desmontar
  }, []);

  return { trades, loading, error, addTrade };
};
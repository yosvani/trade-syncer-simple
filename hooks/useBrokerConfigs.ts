// hooks/useBrokerConfigs.ts
// Hook para manejar configs de brokers. Modular: DB operaciones para simulaciones, real-time.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-db';
import { BrokerConfig } from '../types';

export const useBrokerConfigs = () => {
  const [configs, setConfigs] = useState<BrokerConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConfigs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supError } = await supabase.from('broker_configs').select('*');
      if (supError) throw supError;
      setConfigs(data as BrokerConfig[]);
    } catch (err) {
      setError((err as any).message || 'Error fetching configs');
    } finally {
      setLoading(false);
    }
  };

  const addConfig = async (broker_name: string, api_key: string, config: any) => {
    try {
      const { error: supError } = await supabase.from('broker_configs').insert({ broker_name, api_key, config });
      if (supError) throw supError;
      fetchConfigs();
    } catch (err) {
      setError((err as any).message || 'Error adding config');
    }
  };

  useEffect(() => {
    fetchConfigs();
    const subscription = supabase
      .channel('broker_configs-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'broker_configs' }, () => fetchConfigs())
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, []);

  return { configs, loading, error, addConfig };
};
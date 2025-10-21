import { useState, useEffect } from 'react';
import { supabase, Commune } from '../lib/supabase';

export function useCommunes() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunes() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('communes_growth')
          .select('*')
          .order('nom');

        if (error) throw error;

        setCommunes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch communes');
      } finally {
        setLoading(false);
      }
    }

    fetchCommunes();
  }, []);

  return { communes, loading, error };
}

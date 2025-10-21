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
        let allCommunes: Commune[] = [];
        const chunk = 1000; // nombre max de lignes par requête
        let from = 0;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from('communes')
            .select('*')
            .range(from, from + chunk - 1);

          if (error) throw error;

          allCommunes = allCommunes.concat(data || []);
          hasMore = (data?.length ?? 0) === chunk; // s'il y a moins que chunk, on a tout récupéré
          from += chunk;
        }
        setCommunes(allCommunes);
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

import { useState, useEffect, useMemo } from 'react';
import { supabase, Commune } from '../lib/supabase';

export function useCommunes() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [versions, setVersions] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunes() {
      try {
        setLoading(true);
        
        // Fetch all at once with select optimization
        const { data, error } = await supabase
          .from('communes').select('*')
          .order('score', { ascending: false });

        if (error) throw error;
        if (!data) throw new Error('No data returned from Supabase');
        setCommunes(data || []);

        // Memoize versions calculation
        const uniqueVersions = Array.from(
          new Set(
            (data || [])
              .map((c: any) => c.version)
              .filter((v) => v !== undefined && v !== null)
          )
        ).sort((a, b) => Number(b) - Number(a));
        
        setVersions(uniqueVersions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch communes');
      } finally {
        setLoading(false);
      }
    }

    fetchCommunes();
  }, []);

  return { communes, versions, loading, error };
}
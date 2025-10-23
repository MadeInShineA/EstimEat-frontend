import { useState, useEffect } from 'react';
import { Commune } from '../lib/supabase';

interface CsvCommune {
  commune: string;
  third_sector_job_score: number;
  building_score: number;
  demographie_score: number;
  restau_score: number;
  third_sector_establishment_score: number;
  total: number;
}

export function useCommunes() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [versions, setVersions] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunes() {
      try {
        setLoading(true);

        const response = await fetch('/data/models_output/locality_scores.csv');
        if (!response.ok) throw new Error('Failed to fetch locality_scores.csv');
        const csvText = await response.text();

        const lines = csvText.trim().split('\n');
        const data: CsvCommune[] = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            commune: values[0],
            third_sector_job_score: parseFloat(values[1]),
            building_score: parseFloat(values[2]),
            demographie_score: parseFloat(values[3]),
            restau_score: parseFloat(values[4]),
            third_sector_establishment_score: parseFloat(values[5]),
            total: parseFloat(values[6]),
          };
        });

        const communesData: Commune[] = data.map((row, index) => ({
          id: index + 1,
          name: row.commune,
          lat: 0, // dummy
          long: 0, // dummy
          canton: '', // dummy
          score: row.total, // default to total
          features: [], // dummy
          extra_info: '', // dummy
          version: 1, // dummy
          third_sector_job_score: row.third_sector_job_score,
          building_score: row.building_score,
          demographie_score: row.demographie_score,
          restau_score: row.restau_score,
          third_sector_establishment_score: row.third_sector_establishment_score,
          total_score: row.total,
        }));

        setCommunes(communesData);
        setVersions([1]); // single version
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
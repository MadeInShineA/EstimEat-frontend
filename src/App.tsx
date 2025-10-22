import { useEffect, useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { HeatMap } from './components/HeatMap';
import { useCommunes } from './hooks/useCommunes';
import { Commune } from './lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import { TopCommunes } from './components/TopCommunes';

function App() {
  const { communes: rawCommunes, versions, loading: communeLoading, error } = useCommunes();
  const [loading, setLoading] = useState(communeLoading);
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  // Memoize filtered communes
  const filteredCommunes = useMemo(() => {
    if (!selectedVersion) return rawCommunes.filter((c) => c.version === versions[0]);
    return rawCommunes.filter((c) => c.version === selectedVersion);
  }, [rawCommunes, selectedVersion, versions]);

  // Memoize communes by name mapping
  const communesByName = useMemo(() => {
    if (!geoJsonData || rawCommunes.length === 0) return {};
    
    const dict: Record<string, any> = {};
    rawCommunes.forEach(c => {
      const feature = geoJsonData.features.find(
        (f: any) => {
          try {
            return f.properties.NAME?.trim().toLowerCase() === c.name.trim().toLowerCase();
          } catch (error) {
            return false;
          }
        }
      );
      dict[c.name.trim().toLowerCase()] = { ...c, geo: feature };
    });
    return dict;
  }, [geoJsonData, rawCommunes]);

  // Load GeoJSON once
  useEffect(() => {
    setLoading(true);
    fetch('/data/communes.geojson')
      .then(res => {
        if (!res.ok) throw new Error('GeoJSON non trouvé');
        return res.json();
      })
      .then(data => {
        setGeoJsonData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement du GeoJSON:', err);
        setLoading(false);
      });
  }, []);

  // Handle version change with useCallback
  const handleVersionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const ver = Number(e.target.value);
    setSelectedVersion(ver);
    setSelectedCommune(null);
  }, []);

  // Handle commune selection with useCallback
  const handleCommuneSelect = useCallback((commune: Commune) => {
    setSelectedCommune(commune);
  }, []);

  if (loading || communeLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading commune data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Error loading data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      {/* Top Banner - Search + Top Communes */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 shadow-sm z-10">
        <div className="max-w-[1800px] mx-auto flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <SearchBar 
              rawCommunes={filteredCommunes} 
              communesByName={communesByName} 
              onSelect={handleCommuneSelect} 
            />
            <div>
              <label htmlFor="version-select" className="sr-only">Version</label>
              <select
                id="version-select"
                defaultValue={versions[0]}
                onChange={handleVersionChange}
                className="block w-auto rounded-md border-gray-200 bg-white py-2 px-3 text-sm shadow-sm"
              >
                {versions?.map((v) => (
                  <option key={String(v)} value={String(v)}>{String(v)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-12 w-px bg-gray-200"></div>

          {/* Top Communes Horizontal */}
          <div className="flex-1 overflow-x-auto">
            <TopCommunes communes={filteredCommunes} communesByName={communesByName} topN={5} />
          </div>
        </div>
      </div>

      {/* Map - Takes remaining space */}
      <div className="flex-1 relative">
        <HeatMap
          communes={filteredCommunes}
          selectedCommune={selectedCommune}
          geoJsonData={geoJsonData}
          communesByName={communesByName}
        />
      </div>

      {/* Bottom Banner - Legend */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-3 shadow-sm z-10">
        <div className="max-w-[1800px] mx-auto">
          <Legend />
        </div>
      </div>
    </div>
  );
}

export default App;
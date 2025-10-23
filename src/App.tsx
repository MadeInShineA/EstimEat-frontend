import { useEffect, useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { HeatMap } from './components/HeatMap';
import { useCommunes } from './hooks/useCommunes';
import { Commune } from './lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import { TopCommunes } from './components/TopCommunes';

// Extended Commune type with displayScore
type CommuneWithDisplay = Commune & { displayScore: number };

function App() {
  const { communes: rawCommunes, versions, loading: communeLoading, error } = useCommunes();
  const [loading, setLoading] = useState(communeLoading);
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [scoreType, setScoreType] = useState<string>('total_score');

  // Memoize filtered communes
  const filteredCommunes = useMemo(() => {
    if (!selectedVersion) return rawCommunes.filter((c) => c.version === versions[0]);
    return rawCommunes.filter((c) => c.version === selectedVersion);
  }, [rawCommunes, selectedVersion, versions]);

  // Extract available score types from commune data structure
  const availableScoreTypes = useMemo(() => {
    const scoreTypes: Array<{ key: string; label: string }> = [
      { key: 'total_score', label: '🌍 Global Score' },
      { key: 'third_sector_job_score', label: '💼 Third Sector Jobs' },
      { key: 'building_score', label: '🏗️ Buildings' },
      { key: 'demographie_score', label: '👥 Demographics' },
      { key: 'restau_score', label: '🍽️ Restaurants' },
      { key: 'third_sector_establishment_score', label: '🏢 Third Sector Establishments' },
    ];
    
    return scoreTypes;
  }, []);

  // Compute communes with the selected score type
  const communesWithScore = useMemo((): CommuneWithDisplay[] => {
    return filteredCommunes.map(commune => {
      let displayScore = commune.total_score || commune.score; // Default to total score
      
      // Get the score based on selected type
      switch (scoreType) {
        case 'total_score':
          displayScore = commune.total_score || commune.score;
          break;
        case 'third_sector_job_score':
          displayScore = commune.third_sector_job_score || 0;
          break;
        case 'building_score':
          displayScore = commune.building_score || 0;
          break;
        case 'demographie_score':
          displayScore = commune.demographie_score || 0;
          break;
        case 'restau_score':
          displayScore = commune.restau_score || 0;
          break;
        case 'third_sector_establishment_score':
          displayScore = commune.third_sector_establishment_score || 0;
          break;
        default:
          displayScore = commune.total_score || commune.score;
      }
      
      return { ...commune, displayScore };
    });
  }, [filteredCommunes, scoreType]);

  // Memoize communes by name mapping
  const communesByName = useMemo(() => {
    if (!geoJsonData || communesWithScore.length === 0) return {};
    
    const dict: Record<string, any> = {};
    communesWithScore.forEach(c => {
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
  }, [geoJsonData, communesWithScore]);

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

  // Handle score type change
  const handleScoreTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setScoreType(e.target.value);
    setSelectedCommune(null);
  }, []);

  // Handle commune selection
  const handleCommuneSelect = useCallback((commune: Commune) => {
    setSelectedCommune(commune);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  if (loading || communeLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading commune data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Error loading data</p>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header isDark={isDark} onToggleTheme={toggleDarkMode} />
      
      {/* Top Section - Responsive Stack/Grid */}
      <div className={`${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm border-b shadow-sm z-10`}>
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-3 py-3">
            {/* Search Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 xl:flex-shrink-0">
              <div className="flex-1 sm:flex-initial sm:min-w-[240px]">
                <SearchBar 
                  rawCommunes={communesWithScore} 
                  communesByName={communesByName} 
                  onSelect={handleCommuneSelect}
                  isDark={isDark}
                />
              </div>
              <div className="w-full sm:w-auto sm:min-w-[220px]">
                <label htmlFor="score-type-select" className="sr-only">Score Type</label>
                <select
                  id="score-type-select"
                  value={scoreType}
                  onChange={handleScoreTypeChange}
                  className={`block w-full rounded-lg py-2.5 px-4 text-sm shadow-sm transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500 focus:border-emerald-500'
                      : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20`}
                >
                  {availableScoreTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Divider - Hidden on mobile & tablet */}
            <div className={`hidden xl:block h-10 w-px mx-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

            {/* Top Communes - Responsive */}
            <div className="flex-1 min-w-0">
              <TopCommunes 
                communes={communesWithScore} 
                communesByName={communesByName} 
                topN={3}
                isDark={isDark}
                scoreType={scoreType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map - Takes remaining space */}
      <div className="flex-1 relative min-h-0">
        <HeatMap
          communes={communesWithScore}
          selectedCommune={selectedCommune}
          geoJsonData={geoJsonData}
          communesByName={communesByName}
          isDark={isDark}
          scoreType={scoreType}
        />
      </div>

      {/* Bottom Banner - Legend */}
      <div className={`${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm border-t shadow-sm z-10`}>
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <Legend isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

export default App;
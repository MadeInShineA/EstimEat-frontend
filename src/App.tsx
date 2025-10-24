import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { useCommunes } from './hooks/useCommunes';
import { Commune } from './lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';

// Lazy load heavy components
const HeatMap = lazy(() => import('./components/HeatMap').then(module => ({ default: module.HeatMap })));
const LandingPage = lazy(() => import('./components/LandingPage').then(module => ({ default: module.LandingPage })));
const TopCommunes = lazy(() => import('./components/TopCommunes').then(module => ({ default: module.TopCommunes })));

function App() {
  const { communes: rawCommunes, loading: communeLoading, error } = useCommunes();
  const [loading, setLoading] = useState(communeLoading);
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  const [showLanding, setShowLanding] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [scoreType, setScoreType] = useState<string>('total');

  // Memoize communes with score based on scoreType
  const communesWithScore = useMemo(() => {
    return rawCommunes.map(c => ({
      ...c,
      score: scoreType === 'total' ? c.total_score || 0 :
        scoreType === 'third_sector_job_score' ? c.third_sector_job_score || 0 :
          scoreType === 'building_score' ? c.building_score || 0 :
            scoreType === 'demographie_score' ? c.demographie_score || 0 :
              scoreType === 'restau_score' ? c.restau_score || 0 :
                scoreType === 'third_sector_establishment_score' ? c.third_sector_establishment_score || 0 : 0
    }));
  }, [rawCommunes, scoreType]);

  // Memoize communes by name mapping
  const communesByName = useMemo(() => {
    if (!geoJsonData || rawCommunes.length === 0) return {};

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

  // Load GeoJSON once with preload
  useEffect(() => {
    setLoading(true);
    // Preload the GeoJSON
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = '/data/communes.geojson';
    document.head.appendChild(link);

    fetch('/data/communes.geojson')
      .then(res => {
        if (!res.ok) throw new Error('GeoJSON non trouvé');
        return res.json();
      })
      .then(data => {
        setGeoJsonData(data);
        setLoading(false);
        // Remove preload link after loading
        document.head.removeChild(link);
      })
      .catch(err => {
        console.error('Erreur lors du chargement du GeoJSON:', err);
        setLoading(false);
        document.head.removeChild(link);
      });
  }, []);



  // Handle commune selection with useCallback
  const handleCommuneSelect = useCallback((commune: Commune) => {
    setSelectedCommune(commune);
  }, []);

  // Handle entering the app
  const handleEnterApp = useCallback(() => {
    setShowLanding(false);
    // Preload HeatMap component for faster loading
    import('./components/HeatMap');
  }, []);

  // Handle theme toggle
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (showLanding) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      }>
        <LandingPage onEnterApp={handleEnterApp} isDark={isDark} onToggleTheme={toggleTheme} />
      </Suspense>
    );
  }

  if (loading || communeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading commune data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-900 dark:text-white font-semibold mb-2">Error loading data</p>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Header showBackButton={true} onBackClick={() => setShowLanding(true)} isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Top Banner - Search + Top Communes */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-6 lg:px-8 py-3 shadow-lg z-10 transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Search Bar and Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <SearchBar
              rawCommunes={communesWithScore}
              communesByName={communesByName}
              onSelect={handleCommuneSelect}
              isDark={isDark}
            />
            <div className="w-full sm:w-auto">
              <label htmlFor="score-type-select" className="sr-only">Score Type</label>
              <select
                id="score-type-select"
                value={scoreType}
                onChange={(e) => setScoreType(e.target.value)}
                className="block w-full md:w-auto glass dark:glass-dark rounded-xl border border-white/30 dark:border-gray-600/30 py-2 px-3 text-sm shadow-lg hover:shadow-xl transition-all duration-300 focus-modern text-slate-900 dark:text-slate-100"
              >
                <option value="total" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Global Score</option>
                <option value="third_sector_job_score" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Third Sector Job</option>
                <option value="building_score" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Building</option>
                <option value="demographie_score" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Demography</option>
                <option value="restau_score" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Restaurant</option>
                <option value="third_sector_establishment_score" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">Third Sector Establishment</option>
              </select>
            </div>
          </div>

          {/* Top Communes */}
            <div className="flex-1">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-8 w-32"></div>}>
                <TopCommunes communes={communesWithScore} communesByName={communesByName} topN={3} onSelect={handleCommuneSelect} isDark={isDark} scoreType={scoreType} />
              </Suspense>
            </div>
        </div>
      </div>

      {/* Map - Takes remaining space */}
      <div className="flex-1 relative">
        <Suspense fallback={
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        }>
          <HeatMap
            communes={communesWithScore}
            selectedCommune={selectedCommune}
            geoJsonData={geoJsonData}
            communesByName={communesByName}
            isDark={isDark}
            scoreType={scoreType}
          />
        </Suspense>
      </div>

      {/* Bottom Banner - Legend */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-6 lg:px-8 py-3 shadow-lg z-10 transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto">
          <Legend />
        </div>
      </div>
    </div>
  );
}

export default App;

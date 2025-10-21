import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { HeatMap } from './components/HeatMap';
import { useCommunes } from './hooks/useCommunes';
import { Commune } from './lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import { TopCommunes } from './components/TopCommunes';
function App() {
  const { communes: rawCommunes, loading, error } = useCommunes();
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  // On stocke le GeoJSON de chaque commune dans un dictionnaire
  const [communesByName, setCommunesByName] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('/data/communes.geojson')
      .then(res => {
        if (!res.ok) throw new Error('GeoJSON non trouvé');
        return res.json();
      })
      .then(data => {
        setGeoJsonData(data);
        console.log(data)

        // Lier le GeoJSON à chaque commune par nom
        const dict: Record<string, any> = {};
        rawCommunes.forEach(c => {
          const feature = data.features.find(
            (f: any) => {
              if (f.properties.NAME?.trim().toLowerCase() === c.name.trim().toLowerCase()) {
                return true;
              }
              return false;
            }
          );
          dict[c.name.trim().toLowerCase()] = { ...c, geo: feature };
        });
        setCommunesByName(dict);
      })
      .catch(err => console.error('Erreur lors du chargement du GeoJSON:', err));
  }, []);

  if (loading) {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-4">
        <div className="w-full max-w-md">
          <SearchBar rawCommunes={rawCommunes} communesByName={communesByName} onSelect={setSelectedCommune} />
        </div>

        <div className="flex-1 relative min-h-[500px] lg:min-h-[600px]">
          <div className="absolute inset-0">
            <HeatMap
              communes={rawCommunes}
              selectedCommune={selectedCommune}
              geoJsonData={geoJsonData}
              communesByName={communesByName}
            />
          </div>

          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <TopCommunes communes={rawCommunes} communesByName={communesByName} topN={5} />
            <Legend />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Showing {rawCommunes.length} communes across Switzerland
        </div>
      </div>
    </div>
  );
}

export default App;

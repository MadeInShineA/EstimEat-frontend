import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Commune } from '../lib/supabase';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import type { Feature, Polygon, MultiPolygon } from 'geojson';

interface HeatMapProps {
  communes: Commune[];
  selectedCommune: Commune | null;
  geoJsonData: any;
}

function MapController({ selectedCommune }: { selectedCommune: Commune | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCommune) {
      map.setView([selectedCommune.lat, selectedCommune.long], 12, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedCommune, map]);

  return null;
}


function CommunePolygons({ geoJsonData, communes }: { geoJsonData: any; communes: Commune[] }) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData || !communes.length) return;

    const getColor = (score: number) => {
      if (score > 80) return '#ff0000';
      if (score > 60) return '#ff8c00';
      if (score > 40) return '#ffff00';
      if (score > 20) return '#00ff00';
      return '#0000ff';
    };

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        // Trouver la commune dont les coordonnées tombent dans ce polygone
        const communeMatch = communes.find(c => {
          try {
            console.log(c.long, c.lat);
            const pt = point([c.long, c.lat]); // Attention: [longitude, latitude] pour GeoJSON
            return booleanPointInPolygon(pt, feature as Feature<Polygon | MultiPolygon>);
          } catch (error) {
            return false;
          }
        });
        
        const score = communeMatch ? communeMatch.score : 0;
        
        console.log(`Score: ${score}, Commune: ${communeMatch?.name || 'Non trouvée'}`);

        return {
          fillColor: getColor(score),
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.6
        };
      },
      onEachFeature: (feature, layer) => {
        const communeMatch = communes.find(c => {
          try {
            const pt = point([c.long, c.lat]);
            return booleanPointInPolygon(pt, feature as Feature<Polygon | MultiPolygon>);
          } catch (error) {
            return false;
          }
        });

        if (communeMatch) {
          layer.bindPopup(`
            <div style="font-family: sans-serif;">
              <h3 style="margin: 0 0 10px 0;">${communeMatch.name}</h3>
              <p style="margin: 5px 0;"><strong>Canton:</strong> ${communeMatch.canton}</p>
              <p style="margin: 5px 0;"><strong>Score:</strong> ${communeMatch.score.toFixed(1)}</p>
            </div>
          `);

          layer.on({
            mouseover: (e) => {
              const target = e.target;
              target.setStyle({
                weight: 3,
                fillOpacity: 0.8
              });
              target.openPopup();
            },
            mouseout: (e) => {
              const target = e.target;
              geoJsonLayer.resetStyle(target);
            }
          });
        }
      }
    }).addTo(map);

    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [geoJsonData, communes, map]);

  return null;
}

export function HeatMap({ communes, selectedCommune, geoJsonData }: HeatMapProps) {
  return (
    <MapContainer 
      center={[46.8, 8.3]} 
      zoom={8} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Polygones des communes avec scores colorés */}
      {geoJsonData && communes.length > 0 && (
        <CommunePolygons geoJsonData={geoJsonData} communes={communes} />
      )}

      <MapController selectedCommune={selectedCommune} />
    </MapContainer>
  );
}
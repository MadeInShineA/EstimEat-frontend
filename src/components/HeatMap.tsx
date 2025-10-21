import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Commune } from '../lib/supabase';

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

    // Dégradé continu
    const getColor = (score: number) => {
      const s = Math.max(0, Math.min(100, score)) / 100;
      const stops = [
        { stop: 0.0, color: [0, 0, 255] },    // bleu
        { stop: 0.33, color: [0, 255, 0] },   // vert
        { stop: 0.66, color: [255, 255, 0] }, // jaune
        { stop: 1.0, color: [255, 0, 0] }     // rouge
      ];
      let i = 0;
      while (i < stops.length - 1 && s > stops[i + 1].stop) i++;
      const t = (s - stops[i].stop) / (stops[i + 1].stop - stops[i].stop);
      const r = Math.round(stops[i].color[0] + t * (stops[i + 1].color[0] - stops[i].color[0]));
      const g = Math.round(stops[i].color[1] + t * (stops[i + 1].color[1] - stops[i].color[1]));
      const b = Math.round(stops[i].color[2] + t * (stops[i + 1].color[2] - stops[i].color[2]));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature: any) => {
        const name = feature.properties.NAME?.trim().toLowerCase();
        const communeMatch = communes.find(c => c.name.trim().toLowerCase() === name);
        const score = communeMatch ? communeMatch.score : 0;
        return {
          fillColor: getColor(score),
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.6
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME?.trim().toLowerCase();
        const communeMatch = communes.find(c => c.name.trim().toLowerCase() === name);

        if (communeMatch) {
          const featuresList = communeMatch.features?.length
            ? `<ul style="margin: 5px 0 0 0; padding-left: 20px;">
                ${communeMatch.features.map(f => `<li>${f}</li>`).join("")}
              </ul>`
            : "<p style='margin: 5px 0;'>Aucune caractéristique disponible.</p>";

          layer.bindPopup(`
            <div style="font-family: sans-serif;">
              <h3 style="margin: 0 0 10px 0;">${communeMatch.name}</h3>
              <p style="margin: 5px 0;"><strong>Canton:</strong> ${communeMatch.canton}</p>
              <p style="margin: 5px 0;"><strong>Score:</strong> ${communeMatch.score.toFixed(1)}</p>
              <h4 style="margin: 10px 0 5px 0;">Caractéristiques :</h4>
              ${featuresList}
            </div>
          `);
        }

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({ weight: 3, fillOpacity: 0.8 });
            target.openPopup();
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
            e.target.closePopup();
          }
        });
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
      center={[46.8, 8.2275]} 
      zoom={8}
      style={{ height: '100vh', width: '100%' }}
      maxBounds={[[45.5, 5.5], [47.9, 10.7]]} // Limite à la Suisse
      maxBoundsViscosity={1.0}
      minZoom={7}
      maxZoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJsonData && communes.length > 0 && (
        <CommunePolygons geoJsonData={geoJsonData} communes={communes} />
      )}

      <MapController selectedCommune={selectedCommune} />
    </MapContainer>
  );
}

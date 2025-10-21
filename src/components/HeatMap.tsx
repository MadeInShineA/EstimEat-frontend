import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface HeatMapProps {
  communes: Commune[];
  selectedCommune: Commune | null;
  geoJsonData: any;
  communesByName: Record<string, any>;
}

function MapController({
  selectedCommune,
  geoJsonData,
  communesByName,
}: {
  selectedCommune: Commune | null;
  geoJsonData: any;
  communesByName: Record<string, any>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedCommune) return;
    const communeGeo = communesByName[selectedCommune.name.trim().toLowerCase()]?.geo;
    if (!communeGeo) return;

    const tempLayer = L.geoJSON(communeGeo);
    const bounds = tempLayer.getBounds();
    const center = bounds.getCenter();

    map.setView([center.lat, center.lng], 12, { animate: true, duration: 1 });
  }, [selectedCommune, communesByName, map]);

  return null;
}

function CommunePolygons({
  geoJsonData,
  communes,
  communesByName,
}: {
  geoJsonData: any;
  communes: Commune[];
  communesByName: Record<string, any>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData || !communes.length) return;

    const getColor = (
    score: number | null | undefined,
    minScore: number = -50,
    maxScore: number = 100 ) => {
      if (score == null) return 'rgb(0, 0, 0)'; // noir pour score manquant

      // Clamp le score dans la plage min/max
      const clamped = Math.max(minScore, Math.min(maxScore, score));

      // Normalisation entre 0 et 1
      const s = (clamped - minScore) / (maxScore - minScore);

      const stops = [
        { stop: 0.0, color: [0, 0, 255] },    // bleu = plus bas
        { stop: 0.25, color: [0, 255, 255] }, // cyan
        { stop: 0.5, color: [0, 255, 0] },    // vert = 0 ou milieu
        { stop: 0.75, color: [255, 255, 0] }, // jaune
        { stop: 1.0, color: [255, 0, 0] }     // rouge = plus haut
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
        const communeMatch = communesByName[name];
        const score = communeMatch ? communeMatch.score : 0;
        const min = Math.min(...communes.map(c => c.score));
        const max = Math.max(...communes.map(c => c.score));
        return {
          fillColor: getColor(score, min, max),
          weight: 1,
          color: 'black',
          opacity: 0.7,
          fillOpacity: 0.6,
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME?.trim().toLowerCase();
        const communeMatch = communesByName[name];
        console.log(communeMatch);

        if (communeMatch) {
          const featuresList = communeMatch.features?.length
            ? `<ul style="margin: 5px 0 0 0; padding-left: 20px;">
                ${communeMatch.features.map((f:any) => `<li>${f}</li>`).join('')}
              </ul>`
            : "<p style='margin: 5px 0;'>Aucune caractéristique disponible.</p>";

          layer.bindPopup(`
            <div style="font-family: sans-serif;">
              <h3 style="margin: 0 0 10px 0;">${communeMatch.name}</h3>
              <p style="margin: 5px 0;"><strong>Canton:</strong> ${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</p>
              <p style="margin: 5px 0;"><strong>Score:</strong> ${communeMatch.score.toFixed(1)}</p>
              <h4 style="margin: 10px 0 5px 0;">Caractéristiques :</h4>
              ${featuresList}
            </div>
          `);
        }

        layer.on({
          mouseover: (e) => {
            e.target.setStyle({ weight: 3, fillOpacity: 0.8 });
            e.target.openPopup();
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
            e.target.closePopup();
          },
        });
      },
    }).addTo(map);

    return () => {map.removeLayer(geoJsonLayer)};
  }, [geoJsonData, communesByName, map]);

  return null;
}

export function HeatMap({
  communes,
  selectedCommune,
  geoJsonData,
  communesByName,
}: HeatMapProps) {
  return (
    <MapContainer
      center={[46.8, 8.2275]}
      zoom={8}
      style={{ height: '100vh', width: '100%' }}
      maxBounds={[[45.5, 5.5], [47.9, 10.7]]}
      maxBoundsViscosity={1.0}
      minZoom={7}
      maxZoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJsonData && communes.length > 0 && (
        <CommunePolygons
          geoJsonData={geoJsonData}
          communes={communes}
          communesByName={communesByName}
        />
      )}

      <MapController
        selectedCommune={selectedCommune}
        geoJsonData={geoJsonData}
        communesByName={communesByName}
      />
    </MapContainer>
  );
}

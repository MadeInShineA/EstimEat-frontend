import { useEffect, useMemo, memo } from 'react';
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
  isDark: boolean;
}

const MapController = memo(function MapController({
  selectedCommune,
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
});

const CommunePolygons = memo(function CommunePolygons({
  geoJsonData,
  communes,
  communesByName,
  selectedCommune,
  isDark,
}: {
  geoJsonData: any;
  communes: Commune[];
  communesByName: Record<string, any>;
  selectedCommune: Commune | null;
  isDark: boolean;
}) {
  const map = useMap();

  // Memoize color function with improved gradient
  const getColor = useMemo(() => {
    const min = Math.min(...communes.map(c => c.score));
    const max = Math.max(...communes.map(c => c.score));

    return (score: number | null | undefined) => {
      if (score == null) return 'rgb(30, 41, 59)';

      const clamped = Math.max(min, Math.min(max, score));
      const s = (clamped - min) / (max - min);

      // Nouveau gradient professionnel: Bleu foncé → Cyan → Vert → Jaune/Orange → Rouge vif
      const stops = [
        { stop: 0.0, color: [30, 58, 138] },    // Bleu foncé (indigo-900)
        { stop: 0.2, color: [59, 130, 246] },   // Bleu vif (blue-500)
        { stop: 0.4, color: [6, 182, 212] },    // Cyan (cyan-500)
        { stop: 0.6, color: [34, 197, 94] },    // Vert (green-500)
        { stop: 0.75, color: [251, 191, 36] },  // Jaune/Orange (amber-400)
        { stop: 0.9, color: [249, 115, 22] },   // Orange vif (orange-500)
        { stop: 1.0, color: [239, 68, 68] }     // Rouge vif (red-500)
      ];

      let i = 0;
      while (i < stops.length - 1 && s > stops[i + 1].stop) i++;

      const t = (s - stops[i].stop) / (stops[i + 1].stop - stops[i].stop);
      const r = Math.round(stops[i].color[0] + t * (stops[i + 1].color[0] - stops[i].color[0]));
      const g = Math.round(stops[i].color[1] + t * (stops[i + 1].color[1] - stops[i].color[1]));
      const b = Math.round(stops[i].color[2] + t * (stops[i + 1].color[2] - stops[i].color[2]));

      return `rgb(${r}, ${g}, ${b})`;
    };
  }, [communes]);

  useEffect(() => {
    if (!geoJsonData || !communes.length) return;

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature: any) => {
        const name = feature.properties.NAME?.trim().toLowerCase();
        const communeMatch = communesByName[name];
        const score = communeMatch ? communeMatch.score : 0;
        
        // Check if this is the selected commune
        const isSelected = selectedCommune && 
          selectedCommune.name.trim().toLowerCase() === name;
        
        return {
          fillColor: getColor(score),
          weight: isSelected ? 4 : 1.5,
          color: isSelected ? '#10b981' : 'rgba(15, 23, 42, 0.8)',
          opacity: 1,
          fillOpacity: isSelected ? 0.9 : 0.75,
          dashArray: isSelected ? '10, 5' : undefined,
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME?.trim().toLowerCase();
        const communeMatch = communesByName[name];
        if (communeMatch) {
          const featuresList = communeMatch.features?.length
            ? `<ul style="margin: 8px 0 0 0; padding-left: 20px; list-style: disc;">
                ${communeMatch.features.map((f: any) => `<li style="margin: 4px 0; color: #94a3b8;">${f}</li>`).join('')}
              </ul>`
            : "<p style='margin: 8px 0; color: #94a3b8; font-style: italic;'>No features available</p>";

          layer.bindTooltip(`
            <div class="tooltip-content ${isDark ? 'dark' : 'light'}">
              <h3 class="tooltip-title">${communeMatch.name}</h3>
              <div class="tooltip-stats">
                <div class="tooltip-stat">
                  <span class="tooltip-label">Canton</span>
                  <span class="tooltip-value">${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</span>
                </div>
                <div class="tooltip-stat">
                  <span class="tooltip-label">Score</span>
                  <span class="tooltip-value">${communeMatch.score.toFixed(1)}</span>
                </div>
              </div>
              <h4 class="tooltip-features-title">Key Features</h4>
              ${featuresList}
            </div>
          `, {
            className: 'custom-tooltip',
            direction: 'top',
            opacity: 1
          });
        }

        layer.on({
          mouseover: (e) => {
            const name = feature.properties.NAME?.trim().toLowerCase();
            const isSelected = selectedCommune && 
              selectedCommune.name.trim().toLowerCase() === name;
            
            if (!isSelected) {
              e.target.setStyle({
                weight: 3,
                fillOpacity: 0.95,
                color: 'rgba(16, 185, 129, 0.9)'
              });
            }
            e.target.openPopup();
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
            e.target.closePopup();
          },
        });
      },
    }).addTo(map);

    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [geoJsonData, communesByName, map, communes, getColor, selectedCommune, isDark]);



  return null;
});

export const HeatMap = memo(function HeatMap({
  communes,
  selectedCommune,
  geoJsonData,
  communesByName,
  isDark,
}: HeatMapProps) {
  return (
    <MapContainer
      center={[46.8, 8.2275]}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      maxBounds={[[45.5, 5.5], [47.9, 10.7]]}
      maxBoundsViscosity={1.0}
      minZoom={7}
      maxZoom={13}
      zoomControl={true}
      preferCanvas={true}
      className={`modern-map ${isDark ? 'dark-theme' : 'light-theme'}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={isDark
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        }
      />

      {geoJsonData && communes.length > 0 && (
        <CommunePolygons
          geoJsonData={geoJsonData}
          communes={communes}
          communesByName={communesByName}
          selectedCommune={selectedCommune}
          isDark={isDark}
        />
      )}

      <MapController
        selectedCommune={selectedCommune}
        geoJsonData={geoJsonData}
        communesByName={communesByName}
      />
    </MapContainer>
  );
});
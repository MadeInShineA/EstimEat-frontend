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
            <div style="font-family: system-ui, -apple-system, sans-serif; background: ${isDark ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'}; border-radius: 16px; padding: 20px; border: 2px solid ${isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)'}; box-shadow: 0 25px 50px -12px ${isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.15)'}; backdrop-filter: blur(10px);">
              <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; color: ${isDark ? '#f1f5f9' : '#0f172a'}; border-bottom: 3px solid rgba(16, 185, 129, 0.5); padding-bottom: 10px; text-shadow: ${isDark ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'};">${communeMatch.name}</h3>
              <div style="display: flex; gap: 20px; margin-bottom: 16px;">
                <div style="background: ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'}; padding: 12px; border-radius: 12px; border: 1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'};">
                  <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${isDark ? '#94a3b8' : '#64748b'}; font-weight: 700;">Canton</p>
                  <p style="margin: 6px 0 0 0; font-size: 16px; font-weight: 700; color: #10b981; text-shadow: 0 1px 2px rgba(16, 185, 129, 0.3);">${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</p>
                </div>
                <div style="background: ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'}; padding: 12px; border-radius: 12px; border: 1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'};">
                  <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${isDark ? '#94a3b8' : '#64748b'}; font-weight: 700;">Score</p>
                  <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #10b981; text-shadow: 0 1px 2px rgba(16, 185, 129, 0.3);">${communeMatch.score.toFixed(1)}</p>
                </div>
              </div>
              <h4 style="margin: 16px 0 8px 0; font-size: 14px; font-weight: 700; color: ${isDark ? '#e2e8f0' : '#374151'}; text-transform: uppercase; letter-spacing: 1px;">Key Features</h4>
              ${featuresList.replace(/color: #94a3b8/g, `color: ${isDark ? '#cbd5e1' : '#4b5563'}`).replace(/color: #64748b/g, `color: ${isDark ? '#94a3b8' : '#6b7280'}`)}
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
  }, [geoJsonData, communesByName, map, communes, getColor, selectedCommune]);

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
      className="modern-map"
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
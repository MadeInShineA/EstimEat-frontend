 import { useEffect, useMemo, memo, useState } from 'react';
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
  scoreType?: string;
}

const FullscreenButton = memo(function FullscreenButton({ isDark }: { isDark: boolean }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const mapContainer = document.querySelector('.leaflet-container')?.parentElement;
    if (!mapContainer) return;

    if (!document.fullscreenElement) {
      mapContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className={`absolute top-2 right-2 md:top-4 md:right-4 z-[1000] p-2 rounded-md shadow-md transition-colors ${
        isDark
          ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
      }`}
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isFullscreen ? (
          // Minimize icon
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3"/>
        ) : (
          // Maximize icon
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        )}
      </svg>
    </button>
  );
});

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
  scoreType,
}: {
  geoJsonData: any;
  communes: Commune[];
  communesByName: Record<string, any>;
  selectedCommune: Commune | null;
  isDark: boolean;
  scoreType: string;
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
          const scoreLabel = scoreType === 'total' ? 'Global Score' :
            scoreType === 'third_sector_job_score' ? 'Third Sector Job Score' :
              scoreType === 'building_score' ? 'Building Score' :
                scoreType === 'demographie_score' ? 'Demography Score' :
                  scoreType === 'restau_score' ? 'Restaurant Score' :
                    scoreType === 'third_sector_establishment_score' ? 'Third Sector Establishment Score' : 'Score';

          const textColor = isDark ? '#e5e7eb' : '#374151';

          let tooltipContent = `
            <div class="tooltip-content ${isDark ? 'dark' : 'light'}" style="z-index: 10000;">
              <h3 class="tooltip-title">${communeMatch.name}</h3>
              <div class="tooltip-stats" style="display: flex; flex-direction: column;">
                <div class="tooltip-canton">
                  <div class="tooltip-label">Canton</div>
                  <div class="tooltip-value">${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</div>
                </div>
                <div class="tooltip-score-main">
                  <div class="tooltip-label">${scoreLabel}</div>
                  <div class="tooltip-value">${communeMatch.score.toFixed(1)}</div>
                </div>
              </div>`;

          if (scoreType === 'total') {
            tooltipContent += `
              <h4 class="tooltip-scores-title" style="color: ${textColor};">Score Details</h4>
              <ul style="margin: 8px 0 0 0; padding-left: 20px; list-style: disc;">
                <li style="margin: 4px 0; color: ${textColor};">Third Sector Job: ${(communeMatch.third_sector_job_score || 0).toFixed(1)}</li>
                <li style="margin: 4px 0; color: ${textColor};">Building: ${(communeMatch.building_score || 0).toFixed(1)}</li>
                <li style="margin: 4px 0; color: ${textColor};">Demography: ${(communeMatch.demographie_score || 0).toFixed(1)}</li>
                <li style="margin: 4px 0; color: ${textColor};">Restaurant: ${(communeMatch.restau_score || 0).toFixed(1)}</li>
                <li style="margin: 4px 0; color: ${textColor};">Third Sector Est.: ${(communeMatch.third_sector_establishment_score || 0).toFixed(1)}</li>
              </ul>`;
          }

          tooltipContent += `
            </div>`;

          layer.bindTooltip(tooltipContent, {
            className: 'custom-tooltip',
            direction: 'top',
            opacity: 1,
            permanent: false,
            sticky: false
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
  scoreType = 'total',
}: HeatMapProps) {
  return (
    <div className="relative w-full h-full">
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
            scoreType={scoreType}
          />
        )}

        <MapController
          selectedCommune={selectedCommune}
          geoJsonData={geoJsonData}
          communesByName={communesByName}
        />
      </MapContainer>
      <FullscreenButton isDark={isDark} />
    </div>
  );
});

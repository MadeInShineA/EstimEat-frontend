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

  // Calculer la couleur directement dans le useMemo au lieu d'utiliser un state
  const textColor = useMemo(() => isDark ? '#D1D5DB' : '#374151', [isDark]);

  // Memoize color function with improved gradient
  const getColor = useMemo(() => {
    // Use displayScore if available, otherwise use score
    const scores = communes.map((c:any) => c.displayScore || c.score);
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    return (score: number | null | undefined) => {
      if (score == null) return 'rgb(30, 41, 59)';

      const clamped = Math.max(min, Math.min(max, score));
      const s = (clamped - min) / (max - min);

      const stops = [
        { stop: 0.0, color: [30, 58, 138] },
        { stop: 0.2, color: [59, 130, 246] },
        { stop: 0.4, color: [6, 182, 212] },
        { stop: 0.6, color: [34, 197, 94] },
        { stop: 0.75, color: [251, 191, 36] },
        { stop: 0.9, color: [249, 115, 22] },
        { stop: 1.0, color: [239, 68, 68] }
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
        const score = communeMatch ? (communeMatch.displayScore || communeMatch.score) : 0;
        
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
          const displayScore = communeMatch.displayScore || communeMatch.score;
          const scoreLabel = scoreType === 'total_score' ? 'Global Score' : scoreType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          // Fonction pour générer le popup dynamiquement
          const generatePopup = () => {
            const currentTextColor = isDark ? '#D1D5DB' : '#374151';
            const currentBgGradient = isDark 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
            const currentBorderColor = isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)';
            
            let popup = `
              <div style="font-family: system-ui, -apple-system, sans-serif; background: ${currentBgGradient}; border-radius: 12px; padding: 16px; border: 1px solid ${currentBorderColor}; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: ${currentTextColor}; border-bottom: 2px solid rgba(16, 185, 129, 0.3); padding-bottom: 8px;">${communeMatch.name}</h3>
                <div style="display: flex; gap: 16px; margin-bottom: 12px;">
                  <div>
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: ${currentTextColor}; opacity: 0.7; font-weight: 600;">Canton</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600; color: #10b981;">${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</p>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: ${currentTextColor}; opacity: 0.7; font-weight: 600;">${scoreLabel}</p>
                    <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 700; color: #10b981;">${displayScore.toFixed(1)}</p>
                  </div>
                </div>
            `;
            
            if (scoreType === 'total_score') {
              popup += `
                <h4 style="color: ${currentTextColor}; margin: 12px 0 8px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Score Details</h4>
                <ul style="margin: 0; padding-left: 20px; list-style: disc;">
                  <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Third Sector Job: <strong>${(communeMatch.third_sector_job_score || 0).toFixed(1)}</strong></li>
                  <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Building: <strong>${(communeMatch.building_score || 0).toFixed(1)}</strong></li>
                  <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Demography: <strong>${(communeMatch.demographie_score || 0).toFixed(1)}</strong></li>
                  <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Restaurant: <strong>${(communeMatch.restau_score || 0).toFixed(1)}</strong></li>
                  <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Third Sector Establishment: <strong>${(communeMatch.third_sector_establishment_score || 0).toFixed(1)}</strong></li>
                </ul>`;
            }
            popup += `</div>`;
            return popup;
          };

          // Bind le tooltip avec le contenu initial
          layer.bindTooltip(generatePopup(), {
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
        
        // Régénérer le popup avec les couleurs actuelles à chaque hover
        const communeMatch = communesByName[name];
        if (communeMatch) {
          const displayScore = communeMatch.displayScore || communeMatch.score;
          const scoreLabel = scoreType === 'total_score' ? 'Global Score' : scoreType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          const currentTextColor = isDark ? '#D1D5DB' : '#374151';
          const currentBgGradient = isDark 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
          const currentBorderColor = isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)';
          
          let popup = `
            <div style="font-family: system-ui, -apple-system, sans-serif; background: ${currentBgGradient}; border-radius: 12px; padding: 16px; border: 1px solid ${currentBorderColor}; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
              <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: ${currentTextColor}; border-bottom: 2px solid rgba(16, 185, 129, 0.3); padding-bottom: 8px;">${communeMatch.name}</h3>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: ${currentTextColor}; opacity: 0.7; font-weight: 600;">Canton</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600; color: #10b981;">${getCantonName(communeMatch.geo.properties.KANTONSNUM)}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: ${currentTextColor}; opacity: 0.7; font-weight: 600;">${scoreLabel}</p>
                <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: 700; color: #10b981;">${displayScore.toFixed(1)}</p>
              </div>
          `;
          
          if (scoreType === 'total_score') {
            popup += `
              <h4 style="color: ${currentTextColor}; margin: 12px 0 8px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Score Details</h4>
              <ul style="margin: 0; padding-left: 20px; list-style: disc;">
                <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Third Sector Job: <strong>${(communeMatch.third_sector_job_score || 0).toFixed(1)}</strong></li>
                <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Building: <strong>${(communeMatch.building_score || 0).toFixed(1)}</strong></li>
                <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Demography: <strong>${(communeMatch.demographie_score || 0).toFixed(1)}</strong></li>
                <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Restaurant: <strong>${(communeMatch.restau_score || 0).toFixed(1)}</strong></li>
                <li style="margin: 4px 0; color: ${currentTextColor}; font-size: 13px;">Third Sector Establishment: <strong>${(communeMatch.third_sector_establishment_score || 0).toFixed(1)}</strong></li>
              </ul>`;
          }
          popup += `</div>`;
          
          // Mettre à jour le contenu du tooltip
          e.target.setTooltipContent(popup);
        }
        
        e.target.openTooltip();
      },
      mouseout: (e) => {
        geoJsonLayer.resetStyle(e.target);
        e.target.closeTooltip();
      },
    });
      },
    }).addTo(map);

    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [geoJsonData, communesByName, map, communes, getColor, selectedCommune, scoreType, isDark]);

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

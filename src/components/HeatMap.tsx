import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Commune } from '../lib/supabase';
import { CommunePopup } from './CommunePopup';

interface HeatMapProps {
  communes: Commune[];
  selectedCommune: Commune | null;
}

function HeatLayer({ communes }: { communes: Commune[] }) {
  const map = useMap();
  const heatLayerRef = useRef<L.HeatLayer | null>(null);

  useEffect(() => {
    if (communes.length === 0) return;

    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    const maxScore = Math.max(...communes.map(c => c.score));
    const heatData: [number, number, number][] = communes.map(commune => [
      commune.lat,
      commune.long,
      commune.score / maxScore
    ]);

    heatLayerRef.current = (L as any).heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: 'blue',
        0.4: 'lime',
        0.7: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [communes, map]);

  return null;
}

function CommuneMarkers({ communes }: { communes: Commune[] }) {
  return (
    <>
      {communes.map((commune) => {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 10px; height: 10px; background: transparent; border: 2px solid rgba(0,0,0,0.3); border-radius: 50%;"></div>',
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });

        const marker = L.marker([commune.lat, commune.long], { icon });

        return (
          <Popup key={commune.id} position={[commune.lat, commune.long]}>
            <CommunePopup commune={commune} />
          </Popup>
        );
      })}
    </>
  );
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

export function HeatMap({ communes, selectedCommune }: HeatMapProps) {
  return (
    <MapContainer
      center={[46.8, 8.3]}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatLayer communes={communes} />
      <CommuneMarkers communes={communes} />
      <MapController selectedCommune={selectedCommune} />
    </MapContainer>
  );
}

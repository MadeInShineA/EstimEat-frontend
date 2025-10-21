import { GeoJSON } from "react-leaflet";

// Fonction pour interpoler les couleurs
function interpolateColor(color1: string, color2: string, factor: number) {
  const c1 = color1.match(/\d+/g)?.map(Number) || [0,0,255];
  const c2 = color2.match(/\d+/g)?.map(Number) || [255,0,0];
  const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}
function CommunePolygons({ communesData, scores }: { communesData: any, scores: number[] }) {
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  const getColor = (score: number) => {
    // factor = 0 -> minScore = bleu, factor = 1 -> maxScore = rouge
    const factor = (score - minScore) / (maxScore - minScore);
    return interpolateColor("rgb(0,0,255)", "rgb(255,0,0)", factor);
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.score),
    weight: 1,
    color: "black",
    fillOpacity: 0.7
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const { nom, canton, score, features, extra_info } = feature.properties;
    layer.bindPopup(`
      <b>${nom}</b> (${canton})<br/>
      Score: ${score}<br/>
      Features: ${features?.join(", ")}<br/>
      Info: ${extra_info || ""}
    `);
  };

  return <GeoJSON data={communesData} style={style} onEachFeature={onEachFeature} />;
}
export default CommunePolygons;

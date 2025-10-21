import { Commune } from "../lib/supabase";

function parseToCommunes(geojson: any): Commune[] {
  if (!geojson || !geojson.features) return [];

  return geojson.features.map((feature: any, index: number) => {
    const properties = feature.properties || {};
    const coordinates = feature.geometry?.coordinates || [0, 0];
    console.log("features:", properties.features);

    return {
      id: properties.id || index,
      name: properties.name || 'Unknown',
      lat: coordinates[1],
      long: coordinates[0],
      canton: properties.canton || 'Unknown',
      score: properties.score || 0,
      features: properties.features || [],
      extra_info: properties.extra_info || '',
      version: properties.version || 1,
    } as Commune;
  });
}

export { parseToCommunes };
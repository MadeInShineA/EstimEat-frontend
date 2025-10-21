import geopandas as gpd

# Chemin vers ton GeoPackage ou Shapefile
gpkg_path = "/home/kevivois/Desktop/HES/Courses/3eme/Hackaton/swissboundaries3d_2025-04_2056_5728.shp"

# Lire le layer des districts
communes = gpd.read_file(gpkg_path, layer="swissBOUNDARIES3D_1_5_TLM_HOHEITSGRENZE")

# Vérifier les premières lignes
print(communes.head())

# Convertir en WGS84 pour compatibilité avec les visualisations web
communes = communes.to_crs(epsg=4326)

# Exporter en GeoJSON
communes.to_file("communes.geojson", driver="GeoJSON")
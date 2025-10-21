import geopandas as gpd
import fiona

# Chemin vers ton fichier GeoPackage (.gpkg)
gpkg_path = "./swissboundaries3d_2025-04_2056_5728.shp"

# Lister les couches (layers) disponibles
layers = fiona.listlayers(gpkg_path)
print("Layers disponibles :", layers)



layer_name = "swissBOUNDARIES3D_1_5_TLM_HOHEITSGEBIET"
communes = gpd.read_file(gpkg_path, layer=layer_name)

communes = communes.to_crs(epsg=4326)

# 5️⃣ Export en GeoJSON
output_path = "communes.geojson"
communes.to_file(output_path, driver="GeoJSON")

print(f"✅ Export terminé : {output_path}")
print("Nombre de communes exportées :", len(communes))
print("Colonnes disponibles :", list(communes.columns))

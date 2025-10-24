import geopandas as gpd
import fiona

gpkg_path = "./swissboundaries3d_2024-01_2056_5728.shp/"

layers = fiona.listlayers(gpkg_path)
print("Available layers :", layers)


layer_name = "swissBOUNDARIES3D_1_5_TLM_HOHEITSGEBIET"
communes = gpd.read_file(gpkg_path, layer=layer_name)

communes = communes.to_crs(epsg=4326)
print(communes.columns)

output_path = "communes.geojson"
communes.to_file(output_path, driver="GeoJSON")

print("Number of communes exported :", len(communes))
print("Available columns:", list(communes.columns))

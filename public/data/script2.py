import pandas as pd

# Charger le fichier CSV avec le bon séparateur
fichier = 'locality_trends_poisson.csv'
df = pd.read_csv(fichier, sep=';')  # <-- ici on précise le séparateur

print(df.head())

# Spécifier le nom de la colonne à arrondir
colonne = 'score'

# Arrondir les nombres de la colonne à 0 décimales
df[colonne] = df[colonne].round(0)

df['score'] = pd.to_numeric(df['score'], errors='coerce')  # transforme tout ce qui n'est pas un nombre en NaN
df['score'] = df['score'].fillna(0)  # ou .fillna('NULL') si tu veux importer comme NULL


# Sauvegarder le fichier
df.to_csv('locality_trends_poisson_cleaned.csv', index=False, sep=';')  # conserver le séparateur

print("Arrondissement terminé!")

import pandas as pd

# Charger le fichier CSV avec le bon séparateur
fichier = 'locality_trend_score.csv'
df = pd.read_csv(fichier, sep=',')  # <-- ici on précise le séparateur

print(df.head())

# Spécifier le nom de la colonne à arrondir
colonne = 'score'

# Arrondir les nombres de la colonne à 0 décimales
df[colonne] = df[colonne].round(0)

df['score'] = pd.to_numeric(df['score'], errors='coerce')
df["version"] = 1
 

# Sauvegarder le fichier
df.to_csv('locality_trends_score_cleaned.csv', index=False, sep=';')  # conserver le séparateur

print("Arrondissement terminé!")

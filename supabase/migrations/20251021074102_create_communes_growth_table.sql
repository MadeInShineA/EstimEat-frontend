/*
  # Create communes_growth table for Swiss commune heatmap

  1. New Tables
    - `communes_growth`
      - `id` (integer, primary key) - Unique identifier for each commune
      - `nom` (text, not null) - Commune name
      - `lat` (float, not null) - Latitude coordinate
      - `long` (float, not null) - Longitude coordinate
      - `canton` (text, not null) - Canton code (e.g., VD, GE, ZH)
      - `score` (float, not null) - Growth score used for heatmap intensity
      - `features` (text[], nullable) - Array of feature strings describing the commune
      - `extra_info` (text, nullable) - Additional information or notes
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `communes_growth` table
    - Add policy for public read access (data is public information)

  3. Notes
    - Table designed for read-only public access
    - Score values should typically be normalized (0-1 or 0-100 range)
    - Features array contains descriptive strings like "Migration +1.2%"
*/

CREATE TABLE IF NOT EXISTS communes_growth (
  id integer PRIMARY KEY,
  nom text NOT NULL,
  lat float NOT NULL,
  long float NOT NULL,
  canton text NOT NULL,
  score float NOT NULL DEFAULT 0,
  features text[],
  extra_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE communes_growth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to communes"
  ON communes_growth
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_communes_nom ON communes_growth(nom);
CREATE INDEX IF NOT EXISTS idx_communes_canton ON communes_growth(canton);
CREATE INDEX IF NOT EXISTS idx_communes_score ON communes_growth(score DESC);

function getCantonName(cantonNumber: number): string {
  const cantons: { [key: number]: string } = {
    1: "Zurich",
    2: "Berne",
    3: "Luzern",
    4: "Uri",
    5: "Schwyz",
    6: "Obwalden",
    7: "Nidwalden",
    8: "Glarus",
    9: "Zug",
    10: "Fribourg",
    11: "Solothurn",
    12: "Basel-Stadt",
    13: "Basel-Landschaft",
    14: "Schaffhausen",
    15: "Appenzell Ausserrhoden",
    16: "Appenzell Innerrhoden",
    17: "St. Gallen",
    18: "Graubünden",
    19: "Aargau",
    20: "Thurgau",
    21: "Tessin",
    22: "Vaud",
    23: "Valais",
    24: "Neuchâtel",
    25: "Genève",
    26: "Jura"
  };
  if (cantonNumber in cantons) {
    return cantons[cantonNumber];
  } else  {
    return "Inconnu"
  }
}

export { getCantonName };
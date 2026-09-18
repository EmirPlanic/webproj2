export interface TrackerModul {
  id: string;
  naziv: string;
  opis: string;
  jedinica: string;
}

export const SVI_MODULI: TrackerModul[] = [
  { id: 'water', naziv: 'Water Tracker', opis: 'Koliko si vode popio dnevno', jedinica: 'casa' },
  { id: 'habit', naziv: 'Habit Tracker', opis: 'Dnevne navike', jedinica: 'navika' },
  { id: 'sleep', naziv: 'Sleep Tracker', opis: 'Sati sna', jedinica: 'sati' },
  { id: 'study', naziv: 'Study Tracker', opis: 'Sati ucenja', jedinica: 'sati' },
  { id: 'meal', naziv: 'Meal Tracker', opis: 'Broj obroka dnevno', jedinica: 'obrok' },
  { id: 'mood', naziv: 'Mood Tracker', opis: 'Raspolozenje 1-10', jedinica: 'ocjena' }
];

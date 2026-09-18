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
  { id: 'study', naziv: 'Study Planner', opis: 'Sati ucenja / plan', jedinica: 'sati' },
  { id: 'yoga', naziv: 'Yoga / Fitness', opis: 'Minute vjezbanja ili yoga', jedinica: 'min' },
  { id: 'task', naziv: 'Task / Project', opis: 'Broj zavrsenih zadataka', jedinica: 'zadatak' },
  { id: 'meal', naziv: 'Meal Planner', opis: 'Broj obroka dnevno', jedinica: 'obrok' },
  { id: 'mood', naziv: 'Mood Tracker', opis: 'Raspolozenje 1-10', jedinica: 'ocjena' },
  { id: 'calendar', naziv: 'Calendar Tracker', opis: 'Broj dogadjaja / obaveza', jedinica: 'stavka' },
  { id: 'finance', naziv: 'Finance Mini', opis: 'Dnevna potrosnja u KM', jedinica: 'KM' },
  { id: 'gratitude', naziv: 'Gratitude Journal', opis: 'Broj stvari zahvalnosti', jedinica: 'stavka' },
  { id: 'reflection', naziv: 'Daily Reflection', opis: 'Ocjena dana 1-10', jedinica: 'ocjena' }
];

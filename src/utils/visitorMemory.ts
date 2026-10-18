// Visitor Memory Engine (Tier 3 Hackathon Boss Level Feature)
// Tracks returning visitors, stores personalized greetings and stats in localStorage.

export interface VisitorProfile {
  visitCount: number;
  lastVisit: string;
  name: string;
  favoriteLantern: string;
  blocksStackedRecord: number;
}

const STORAGE_KEY = 'pip_nursery_visitor_profile';

export const getVisitorProfile = (): VisitorProfile => {
  if (typeof window === 'undefined') {
    return {
      visitCount: 1,
      lastVisit: new Date().toLocaleDateString(),
      name: 'Midnight Wanderer',
      favoriteLantern: 'Sleeping Crescent',
      blocksStackedRecord: 0,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: VisitorProfile = JSON.parse(raw);
      return data;
    }
  } catch {}

  const defaultProfile: VisitorProfile = {
    visitCount: 1,
    lastVisit: new Date().toLocaleDateString(),
    name: 'Midnight Wanderer',
    favoriteLantern: 'Sleeping Crescent',
    blocksStackedRecord: 0,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
  } catch {}

  return defaultProfile;
};

export const recordNewVisit = (): VisitorProfile => {
  const profile = getVisitorProfile();
  profile.visitCount += 1;
  profile.lastVisit = new Date().toLocaleTimeString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
  return profile;
};

export const updateVisitorName = (name: string): void => {
  const profile = getVisitorProfile();
  profile.name = name;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
};

export const updateBlockRecord = (count: number): void => {
  const profile = getVisitorProfile();
  if (count > profile.blocksStackedRecord) {
    profile.blocksStackedRecord = count;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }
};

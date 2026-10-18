export interface DreamWish {
  id: string;
  author: string;
  wish: string;
  timestamp: string;
  color: string;
  seed?: boolean;
}

export interface ChimeNote {
  note: string;
  freq: number;
  label: string;
  color: string;
}

export interface LanternItem {
  id: string;
  name: string;
  description: string;
  blueprint: string;
  power: string;
  color: string;
  glow: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  badge: string;
  pipReaction: string;
}

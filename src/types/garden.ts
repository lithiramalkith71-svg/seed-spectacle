export interface Tree {
  id: string;
  type: 'oak' | 'pine' | 'cherry' | 'maple';
  age: number; // in days
  health: number; // 0-100
  position: [number, number, number];
  lastWatered: Date;
  growthStage: 'seedling' | 'sapling' | 'young' | 'mature' | 'ancient';
  photoUrl?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'water' | 'plant' | 'care' | 'social';
  reward: number; // points
  isCompleted: boolean;
  expiresAt: Date;
}

export interface User {
  id: string;
  name: string;
  level: number;
  totalPoints: number;
  treesPlanted: number;
  challengesCompleted: number;
  avatar?: string;
}

export interface LeaderboardEntry {
  user: User;
  rank: number;
  weeklyPoints: number;
}
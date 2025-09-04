import { useState, useEffect } from 'react';
import { Tree, Challenge, User, LeaderboardEntry } from '@/types/garden';
import { toast } from 'sonner';

// Mock data for demo
const mockUser: User = {
  id: '1',
  name: 'Garden Master',
  level: 5,
  totalPoints: 2450,
  treesPlanted: 12,
  challengesCompleted: 23,
};

const generateMockTrees = (): Tree[] => [
  {
    id: '1',
    type: 'oak',
    age: 15,
    health: 95,
    position: [-2, 0, -2],
    lastWatered: new Date(Date.now() - 1000 * 60 * 60 * 12),
    growthStage: 'young',
  },
  {
    id: '2',
    type: 'pine',
    age: 8,
    health: 85,
    position: [3, 0, 1],
    lastWatered: new Date(Date.now() - 1000 * 60 * 60 * 6),
    growthStage: 'sapling',
  },
  {
    id: '3',
    type: 'cherry',
    age: 25,
    health: 90,
    position: [0, 0, 4],
    lastWatered: new Date(Date.now() - 1000 * 60 * 60 * 8),
    growthStage: 'mature',
  },
];

const generateMockChallenges = (): Challenge[] => [
  {
    id: '1',
    title: 'Water 3 Trees',
    description: 'Keep your garden hydrated by watering 3 different trees',
    type: 'water',
    reward: 150,
    isCompleted: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
  },
  {
    id: '2',
    title: 'Plant a New Tree',
    description: 'Expand your garden by planting a new tree',
    type: 'plant',
    reward: 200,
    isCompleted: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 22),
  },
  {
    id: '3',
    title: 'Visit 5 Gardens',
    description: 'Explore other players\' gardens for inspiration',
    type: 'social',
    reward: 100,
    isCompleted: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
  },
];

const generateMockLeaderboard = (): LeaderboardEntry[] => [
  { user: { ...mockUser, name: 'TreeMaster Pro', totalPoints: 3200 }, rank: 1, weeklyPoints: 850 },
  { user: { ...mockUser, name: 'Garden Sage', totalPoints: 2890 }, rank: 2, weeklyPoints: 720 },
  { user: { ...mockUser, name: 'Forest Friend', totalPoints: 2650 }, rank: 3, weeklyPoints: 680 },
  { user: mockUser, rank: 4, weeklyPoints: 540 },
  { user: { ...mockUser, name: 'Nature Lover', totalPoints: 2100 }, rank: 5, weeklyPoints: 480 },
];

export const useGarden = () => {
  const [user] = useState<User>(mockUser);
  const [trees, setTrees] = useState<Tree[]>(generateMockTrees());
  const [challenges, setChallenges] = useState<Challenge[]>(generateMockChallenges());
  const [leaderboard] = useState<LeaderboardEntry[]>(generateMockLeaderboard());

  // Simulate tree growth over time
  useEffect(() => {
    const interval = setInterval(() => {
      setTrees(prevTrees =>
        prevTrees.map(tree => {
          const daysSinceWatered = (Date.now() - tree.lastWatered.getTime()) / (1000 * 60 * 60 * 24);
          const healthDecay = daysSinceWatered > 1 ? Math.min(daysSinceWatered * 5, 30) : 0;
          const newHealth = Math.max(tree.health - healthDecay, 10);
          
          return {
            ...tree,
            age: tree.age + 0.1, // Slow growth simulation
            health: newHealth,
          };
        })
      );
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const addTree = (newTreeData: Omit<Tree, 'id' | 'age' | 'lastWatered'>) => {
    const newTree: Tree = {
      ...newTreeData,
      id: Date.now().toString(),
      age: 0,
      lastWatered: new Date(),
    };

    setTrees(prev => [...prev, newTree]);
    toast.success('🌱 New tree planted! Watch it grow in your garden.');
  };

  const waterTree = (treeId: string) => {
    setTrees(prev =>
      prev.map(tree =>
        tree.id === treeId
          ? { ...tree, lastWatered: new Date(), health: Math.min(tree.health + 20, 100) }
          : tree
      )
    );
    toast.success('💧 Tree watered! Health restored.');
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, isCompleted: true }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      toast.success(`🏆 Challenge completed! +${challenge.reward} points`);
    }
  };

  return {
    user,
    trees,
    challenges,
    leaderboard,
    addTree,
    waterTree,
    completeChallenge,
  };
};
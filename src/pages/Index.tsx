import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Garden3D } from '@/components/garden/Garden3D';
import { GardenStats } from '@/components/garden/GardenStats';
import { AddTreeDialog } from '@/components/garden/AddTreeDialog';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { LeaderboardCard } from '@/components/leaderboard/LeaderboardCard';
import { useGarden } from '@/hooks/useGarden';
import { Tree } from '@/types/garden';
import { Droplet, TreePine, Trophy, Target } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { user, trees, challenges, leaderboard, addTree, waterTree, completeChallenge } = useGarden();
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  const handleTreeClick = (tree: Tree) => {
    setSelectedTree(tree);
    toast.info(`Selected ${tree.type} tree (Age: ${Math.floor(tree.age)} days, Health: ${Math.floor(tree.health)}%)`);
  };

  const handleWaterSelectedTree = () => {
    if (selectedTree) {
      waterTree(selectedTree.id);
      setSelectedTree(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TreePine className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Virtual Garden</h1>
                <p className="text-sm text-muted-foreground">Grow, nurture, and thrive</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{user.totalPoints.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
              <AddTreeDialog onAddTree={addTree} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Garden Stats */}
        <div className="mb-6">
          <GardenStats user={user} trees={trees} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="garden" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card shadow-card">
            <TabsTrigger value="garden" className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Garden
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Garden Tab */}
          <TabsContent value="garden" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Garden</h2>
              {selectedTree && (
                <Button
                  onClick={handleWaterSelectedTree}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Droplet className="w-4 h-4 mr-2" />
                  Water Selected Tree
                </Button>
              )}
            </div>
            <Garden3D trees={trees} onTreeClick={handleTreeClick} />
            {selectedTree && (
              <div className="bg-card p-4 rounded-lg shadow-card border border-border">
                <h3 className="font-semibold mb-2">Selected Tree: {selectedTree.type}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>Age: {Math.floor(selectedTree.age)} days</div>
                  <div>Health: {Math.floor(selectedTree.health)}%</div>
                  <div>Stage: {selectedTree.growthStage}</div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Daily Challenges</h2>
            <div className="grid gap-4">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onComplete={completeChallenge}
                />
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Garden Masters</h2>
            <div className="grid gap-3">
              {leaderboard.map((entry) => (
                <LeaderboardCard key={entry.user.id} entry={entry} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

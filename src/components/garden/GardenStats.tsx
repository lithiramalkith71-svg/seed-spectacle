import { Card } from '@/components/ui/card';
import { Tree, User } from '@/types/garden';

interface GardenStatsProps {
  user: User;
  trees: Tree[];
}

export const GardenStats = ({ user, trees }: GardenStatsProps) => {
  const healthyTrees = trees.filter(tree => tree.health > 70).length;
  const totalAge = trees.reduce((sum, tree) => sum + tree.age, 0);
  const averageAge = trees.length > 0 ? Math.round(totalAge / trees.length) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-forest text-primary-foreground shadow-card">
        <div className="text-center">
          <div className="text-2xl font-bold">{user.level}</div>
          <div className="text-sm opacity-90">Garden Level</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-growth text-accent-foreground shadow-card">
        <div className="text-center">
          <div className="text-2xl font-bold">{trees.length}</div>
          <div className="text-sm opacity-90">Trees Planted</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-sky text-secondary-foreground shadow-card">
        <div className="text-center">
          <div className="text-2xl font-bold">{healthyTrees}</div>
          <div className="text-sm opacity-90">Healthy Trees</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-gradient-earth text-muted-foreground shadow-card">
        <div className="text-center">
          <div className="text-2xl font-bold">{averageAge}</div>
          <div className="text-sm opacity-90">Avg Tree Age</div>
        </div>
      </Card>
    </div>
  );
};
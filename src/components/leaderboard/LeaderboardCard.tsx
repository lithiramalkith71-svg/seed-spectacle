import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeaderboardEntry } from '@/types/garden';
import { Crown, Trophy, Medal } from 'lucide-react';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
}

export const LeaderboardCard = ({ entry }: LeaderboardCardProps) => {
  const getRankIcon = () => {
    switch (entry.rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-orange-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{entry.rank}</span>;
    }
  };

  const getRankStyle = () => {
    if (entry.rank <= 3) {
      return 'bg-gradient-growth shadow-glow';
    }
    return 'bg-card';
  };

  return (
    <Card className={`p-4 ${getRankStyle()} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getRankIcon()}
          <div>
            <h3 className="font-semibold text-foreground">{entry.user.name}</h3>
            <p className="text-sm text-muted-foreground">Level {entry.user.level}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-accent">
            {entry.weeklyPoints.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            this week
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Badge variant="secondary" className="text-xs">
          {entry.user.treesPlanted} trees
        </Badge>
        <Badge variant="outline" className="text-xs">
          {entry.user.challengesCompleted} challenges
        </Badge>
      </div>
    </Card>
  );
};
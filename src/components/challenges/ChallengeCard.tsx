import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Challenge } from '@/types/garden';
import { CheckCircle, Clock, Droplet, Heart, Users, Sprout } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete?: (challengeId: string) => void;
}

export const ChallengeCard = ({ challenge, onComplete }: ChallengeCardProps) => {
  const getIcon = () => {
    switch (challenge.type) {
      case 'water': return <Droplet className="w-4 h-4" />;
      case 'plant': return <Sprout className="w-4 h-4" />;
      case 'care': return <Heart className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      default: return <Sprout className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (challenge.type) {
      case 'water': return 'bg-blue-100 text-blue-700';
      case 'plant': return 'bg-green-100 text-green-700';
      case 'care': return 'bg-pink-100 text-pink-700';
      case 'social': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const timeLeft = Math.max(0, Math.ceil((challenge.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));

  return (
    <Card className="p-4 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h3 className="font-semibold text-foreground">{challenge.title}</h3>
        </div>
        <Badge className={getTypeColor()}>
          {challenge.type}
        </Badge>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">
        {challenge.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeLeft}h left
          </div>
          <div className="font-medium text-accent">
            +{challenge.reward} points
          </div>
        </div>
        
        {challenge.isCompleted ? (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => onComplete?.(challenge.id)}
            className="bg-gradient-growth hover:opacity-90"
          >
            Complete
          </Button>
        )}
      </div>
    </Card>
  );
};
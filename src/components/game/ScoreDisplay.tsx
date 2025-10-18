import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame, Clock, Star } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  streak: number;
  timeBonus: number;
  level: number;
}

export const ScoreDisplay = ({ score, streak, timeBonus, level }: ScoreDisplayProps) => {
  return (
    <Card className="border-2 border-accent/20 bg-accent/5">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Score</span>
            </div>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-3xl font-bold text-destructive">{streak}×</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Time Bonus</span>
            </div>
            <p className="text-2xl font-bold text-accent">+{timeBonus}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Level</span>
            </div>
            <p className="text-2xl font-bold text-success">{level}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

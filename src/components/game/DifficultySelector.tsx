import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Zap } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({ difficulty, onDifficultyChange }: DifficultySelectorProps) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Difficulty Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={difficulty === "easy" ? "default" : "outline"}
            onClick={() => onDifficultyChange("easy")}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Easy</span>
          </Button>
          <Button
            variant={difficulty === "medium" ? "default" : "outline"}
            onClick={() => onDifficultyChange("medium")}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Medium</span>
          </Button>
          <Button
            variant={difficulty === "hard" ? "default" : "outline"}
            onClick={() => onDifficultyChange("hard")}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <Zap className="w-5 h-5" />
            <span className="text-xs">Hard</span>
          </Button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {difficulty === "easy" && (
            <div>
              <p className="font-semibold text-foreground mb-1">Easy Mode:</p>
              <ul className="space-y-1 ml-4">
                <li>• 10×10 grid</li>
                <li>• Hints available</li>
                <li>• Formula helpers</li>
                <li>• No time limit</li>
              </ul>
            </div>
          )}
          {difficulty === "medium" && (
            <div>
              <p className="font-semibold text-foreground mb-1">Medium Mode:</p>
              <ul className="space-y-1 ml-4">
                <li>• 20×20 grid</li>
                <li>• Limited hints</li>
                <li>• Calculate yourself</li>
                <li>• No time limit</li>
              </ul>
            </div>
          )}
          {difficulty === "hard" && (
            <div>
              <p className="font-semibold text-foreground mb-1">Hard Mode:</p>
              <ul className="space-y-1 ml-4">
                <li>• 30×30 grid</li>
                <li>• No hints</li>
                <li>• Time pressure</li>
                <li>• Bonus points</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

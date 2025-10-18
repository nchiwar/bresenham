import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Point } from "@/pages/Game";
import { toast } from "sonner";

interface HintSystemProps {
  startPoint: Point | null;
  endPoint: Point | null;
  difficulty: "easy" | "medium" | "hard";
}

export const HintSystem = ({ startPoint, endPoint, difficulty }: HintSystemProps) => {
  const [hintsUsed, setHintsUsed] = useState(0);
  const maxHints = difficulty === "easy" ? 999 : difficulty === "medium" ? 3 : 0;

  const showHint = () => {
    if (!startPoint || !endPoint) {
      toast.error("Select two points first!");
      return;
    }

    if (hintsUsed >= maxHints) {
      toast.error("No more hints available!");
      return;
    }

    const dx = Math.abs(endPoint.x - startPoint.x);
    const dy = Math.abs(endPoint.y - startPoint.y);

    const hints = [
      `Hint: First calculate Δx = x₂ - x₁ = ${endPoint.x} - ${startPoint.x} = ${dx}`,
      `Hint: Then calculate Δy = y₂ - y₁ = ${endPoint.y} - ${startPoint.y} = ${dy}`,
      `Hint: The slope is Δy/Δx = ${dy}/${dx} = ${(dy / dx).toFixed(3)}`,
      `Hint: Calculate 2Δy = 2 × ${dy} = ${2 * dy}`,
      `Hint: Calculate 2Δy - 2Δx = ${2 * dy} - ${2 * dx} = ${2 * dy - 2 * dx}`,
      `Hint: Initial decision parameter P₀ = 2Δy - Δx = ${2 * dy} - ${dx} = ${2 * dy - dx}`,
    ];

    const currentHint = hints[hintsUsed % hints.length];
    toast.info(currentHint, { duration: 8000 });
    setHintsUsed((prev) => prev + 1);
  };

  if (difficulty === "hard") {
    return (
      <Card className="border-2 border-muted">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">No hints available in Hard mode!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Hints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hints Remaining:</span>
            <span className="font-bold text-primary">
              {maxHints === 999 ? "Unlimited" : `${maxHints - hintsUsed}`}
            </span>
          </div>
          <Button onClick={showHint} variant="outline" className="w-full gap-2" disabled={hintsUsed >= maxHints}>
            <Lightbulb className="w-4 h-4" />
            Get Hint
          </Button>
          {difficulty === "easy" && (
            <div className="text-xs text-muted-foreground mt-2">
              <p className="font-semibold mb-1">Formula Reference:</p>
              <div className="font-mono space-y-1 bg-muted p-2 rounded">
                <p>Δx = x₂ - x₁</p>
                <p>Δy = y₂ - y₁</p>
                <p>P₀ = 2Δy - Δx</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

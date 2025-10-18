import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, RotateCcw, Play } from "lucide-react";
import { BresenhamCanvas } from "@/components/game/BresenhamCanvas";
import { CoordinateInputs } from "@/components/game/CoordinateInputs";
import { CalculationsPanel } from "@/components/game/CalculationsPanel";
import { IterationTable } from "@/components/game/IterationTable";
import { SettingsPanel, GridSize, AnimationSpeed, getAnimationDelay } from "@/components/game/SettingsPanel";
import { DifficultySelector, Difficulty } from "@/components/game/DifficultySelector";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { HintSystem } from "@/components/game/HintSystem";
import { AudioNarrationPanel } from "@/components/game/AudioNarrationPanel";
import { useAudioNarration } from "@/hooks/useAudioNarration";
import { toast } from "sonner";

export interface Point {
  x: number;
  y: number;
}

export interface BresenhamCalculations {
  dx: number;
  dy: number;
  twoDy: number;
  twoDyMinusTwoDx: number;
  p0: number;
  slope: number;
}

export interface IterationRow {
  k: number;
  pk: number;
  x: number;
  y: number;
}

const GameEnhanced = () => {
  // Game state
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [calculations, setCalculations] = useState<BresenhamCalculations | null>(null);
  const [iterations, setIterations] = useState<IterationRow[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Settings
  const [gridSize, setGridSize] = useState<GridSize>(20);
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>("normal");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  // Scoring
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [level, setLevel] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Audio
  const [elevenLabsKey, setElevenLabsKey] = useState<string | null>(null);
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const { speak, stop, isPlaying } = useAudioNarration({ apiKey: elevenLabsKey || undefined });

  // Sync difficulty with grid size
  useEffect(() => {
    if (difficulty === "easy") setGridSize(10);
    else if (difficulty === "medium") setGridSize(20);
    else if (difficulty === "hard") setGridSize(30);
  }, [difficulty]);

  const handleReset = () => {
    setStartPoint(null);
    setEndPoint(null);
    setCalculations(null);
    setIterations([]);
    setIsAnimating(false);
    setStartTime(null);
    setTimeBonus(0);
    stop();
    toast.info("Game reset! Select two points to begin.");
    
    if (narrationEnabled && elevenLabsKey) {
      speak("Game reset. Select two points on the grid to start drawing a line.");
    }
  };

  const calculateTimeBonus = () => {
    if (!startTime) return 0;
    const elapsed = (Date.now() - startTime) / 1000; // seconds
    
    if (difficulty === "hard") {
      // Hard mode: bigger bonus for faster completion
      if (elapsed < 30) return 100;
      if (elapsed < 60) return 50;
      if (elapsed < 90) return 25;
      return 10;
    }
    return 0;
  };

  const handleCalculate = () => {
    if (!startPoint || !endPoint) {
      toast.error("Please select both start and end points first!");
      if (narrationEnabled && elevenLabsKey) {
        speak("Please select both start and end points first.");
      }
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    const dx = Math.abs(endPoint.x - startPoint.x);
    const dy = Math.abs(endPoint.y - startPoint.y);

    if (dx === 0) {
      toast.error("Please select points with different x coordinates!");
      if (narrationEnabled && elevenLabsKey) {
        speak("The x coordinates must be different. Please select different points.");
      }
      return;
    }

    const twoDy = 2 * dy;
    const twoDyMinusTwoDx = 2 * (dy - dx);
    const p0 = twoDy - dx;
    const slope = dy / dx;

    setCalculations({
      dx,
      dy,
      twoDy,
      twoDyMinusTwoDx,
      p0,
      slope,
    });

    // Generate iteration table
    const newIterations: IterationRow[] = [];
    let x = startPoint.x;
    let y = startPoint.y;
    let pk = p0;

    const xStep = endPoint.x > startPoint.x ? 1 : -1;
    const yStep = endPoint.y > startPoint.y ? 1 : -1;

    for (let k = 0; x !== endPoint.x; k++) {
      newIterations.push({ k, pk, x, y });

      if (pk < 0) {
        pk = pk + twoDy;
        x = x + xStep;
      } else {
        pk = pk + twoDyMinusTwoDx;
        x = x + xStep;
        y = y + yStep;
      }
    }

    // Add final point
    newIterations.push({
      k: newIterations.length,
      pk: 0,
      x: endPoint.x,
      y: endPoint.y,
    });

    setIterations(newIterations);
    
    // Calculate score
    const basePoints = difficulty === "easy" ? 50 : difficulty === "medium" ? 100 : 200;
    const newScore = score + basePoints * (streak + 1);
    setScore(newScore);
    setStreak((prev) => prev + 1);

    toast.success("Calculations complete! Review the iteration table below.");
    
    if (narrationEnabled && elevenLabsKey) {
      speak(
        `Excellent! Delta X is ${dx}, Delta Y is ${dy}. The initial decision parameter P zero is ${p0}. The line has ${newIterations.length} pixels. You earned ${basePoints * (streak + 1)} points!`
      );
    }
  };

  const handleAnimate = () => {
    if (iterations.length === 0) {
      toast.error("Please calculate the line first!");
      if (narrationEnabled && elevenLabsKey) {
        speak("Please calculate the line first before animating.");
      }
      return;
    }

    // Calculate time bonus before animation
    const bonus = calculateTimeBonus();
    setTimeBonus(bonus);
    if (bonus > 0) {
      setScore((prev) => prev + bonus);
      toast.success(`Time bonus: +${bonus} points!`);
    }

    // Level up every 3 successful lines
    if ((streak + 1) % 3 === 0) {
      setLevel((prev) => prev + 1);
      toast.success("Level up! 🎉");
      if (narrationEnabled && elevenLabsKey) {
        speak("Congratulations! You leveled up!");
      }
    }

    setIsAnimating(true);
    toast.info("Animation started! Watch the pixels light up.");
    
    if (narrationEnabled && elevenLabsKey) {
      speak("Animation started. Watch as the algorithm draws the line pixel by pixel.");
    }
  };

  const handlePointSelect = (point: Point) => {
    if (!startPoint) {
      setStartPoint(point);
      toast.success(`Start point selected: (${point.x}, ${point.y})`);
      if (narrationEnabled && elevenLabsKey) {
        speak(`Start point selected at coordinates ${point.x}, ${point.y}.`);
      }
    } else if (!endPoint) {
      setEndPoint(point);
      toast.success(`End point selected: (${point.x}, ${point.y})`);
      if (narrationEnabled && elevenLabsKey) {
        speak(`End point selected at coordinates ${point.x}, ${point.y}. Now calculate the line.`);
      }
    } else {
      toast.info("Both points selected. Reset to choose new points.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link to="/tutorial">
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Tutorial
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Title & Score */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Bresenham Algorithm Game
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master the algorithm with interactive challenges!
          </p>
          <ScoreDisplay score={score} streak={streak} timeBonus={timeBonus} level={level} />
        </div>

        {/* Settings Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <DifficultySelector difficulty={difficulty} onDifficultyChange={setDifficulty} />
          <SettingsPanel
            gridSize={gridSize}
            animationSpeed={animationSpeed}
            onGridSizeChange={setGridSize}
            onAnimationSpeedChange={setAnimationSpeed}
          />
          <AudioNarrationPanel
            apiKey={elevenLabsKey}
            onApiKeyChange={setElevenLabsKey}
            isPlaying={isPlaying}
            onToggleNarration={() => {
              if (narrationEnabled) {
                stop();
                setNarrationEnabled(false);
                toast.info("Narration disabled");
              } else {
                setNarrationEnabled(true);
                toast.success("Narration enabled");
                if (elevenLabsKey) {
                  speak("Audio narration enabled. I will guide you through the Bresenham algorithm.");
                }
              }
            }}
          />
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column: Canvas */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <BresenhamCanvas
                startPoint={startPoint}
                endPoint={endPoint}
                onPointSelect={handlePointSelect}
                iterations={isAnimating ? iterations : []}
                gridSize={gridSize}
                animationSpeed={getAnimationDelay(animationSpeed)}
              />
            </CardContent>
          </Card>

          {/* Right Column: Inputs and Controls */}
          <div className="space-y-6">
            <CoordinateInputs
              startPoint={startPoint}
              endPoint={endPoint}
              onStartPointChange={setStartPoint}
              onEndPointChange={setEndPoint}
              gridSize={gridSize}
            />

            <CalculationsPanel calculations={calculations} />

            <HintSystem startPoint={startPoint} endPoint={endPoint} difficulty={difficulty} />

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleCalculate}
                    className="w-full"
                    size="lg"
                    disabled={!startPoint || !endPoint}
                  >
                    Calculate Line
                  </Button>
                  <Button
                    onClick={handleAnimate}
                    variant="success"
                    className="w-full gap-2"
                    size="lg"
                    disabled={iterations.length === 0 || isAnimating}
                  >
                    <Play className="w-4 h-4" />
                    Animate Drawing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Iteration Table */}
        {iterations.length > 0 && <IterationTable iterations={iterations} />}
      </div>
    </div>
  );
};

export default GameEnhanced;

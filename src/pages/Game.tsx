import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react";
import { BresenhamCanvas } from "@/components/game/BresenhamCanvas";
import { CoordinateInputs } from "@/components/game/CoordinateInputs";
import { CalculationsPanel } from "@/components/game/CalculationsPanel";
import { IterationTable } from "@/components/game/IterationTable";
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

const Game = () => {
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [calculations, setCalculations] = useState<BresenhamCalculations | null>(null);
  const [iterations, setIterations] = useState<IterationRow[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReset = () => {
    setStartPoint(null);
    setEndPoint(null);
    setCalculations(null);
    setIterations([]);
    setIsAnimating(false);
    toast.info("Game reset! Select two points to begin.");
  };

  const handleCalculate = () => {
    if (!startPoint || !endPoint) {
      toast.error("Please select both start and end points first!");
      return;
    }

    const dx = Math.abs(endPoint.x - startPoint.x);
    const dy = Math.abs(endPoint.y - startPoint.y);

    if (dx === 0) {
      toast.error("Please select points with different x coordinates!");
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
    toast.success("Calculations complete! Review the iteration table below.");
  };

  const handleAnimate = () => {
    if (iterations.length === 0) {
      toast.error("Please calculate the line first!");
      return;
    }
    setIsAnimating(true);
    toast.info("Animation started! Watch the pixels light up.");
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Bresenham Algorithm Game
          </h1>
          <p className="text-xl text-muted-foreground">
            Click on the grid to select two points, then calculate and animate!
          </p>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column: Canvas */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Interactive Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <BresenhamCanvas
                startPoint={startPoint}
                endPoint={endPoint}
                onPointSelect={(point) => {
                  if (!startPoint) {
                    setStartPoint(point);
                    toast.success(`Start point selected: (${point.x}, ${point.y})`);
                  } else if (!endPoint) {
                    setEndPoint(point);
                    toast.success(`End point selected: (${point.x}, ${point.y})`);
                  } else {
                    toast.info("Both points selected. Reset to choose new points.");
                  }
                }}
                iterations={isAnimating ? iterations : []}
              />
            </CardContent>
          </Card>

          {/* Right Column: Inputs and Calculations */}
          <div className="space-y-6">
            <CoordinateInputs
              startPoint={startPoint}
              endPoint={endPoint}
              onStartPointChange={setStartPoint}
              onEndPointChange={setEndPoint}
            />

            <CalculationsPanel calculations={calculations} />

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
                    className="w-full"
                    size="lg"
                    disabled={iterations.length === 0 || isAnimating}
                  >
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

export default Game;

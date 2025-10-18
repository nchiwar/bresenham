import { useEffect, useRef, useState } from "react";
import { Point, IterationRow } from "@/pages/Game";

interface BresenhamCanvasProps {
  startPoint: Point | null;
  endPoint: Point | null;
  onPointSelect: (point: Point) => void;
  iterations: IterationRow[];
  gridSize?: number;
  animationSpeed?: number;
}

const CELL_SIZE = 25;

export const BresenhamCanvas = ({
  startPoint,
  endPoint,
  onPointSelect,
  iterations,
  gridSize = 20,
  animationSpeed = 200,
}: BresenhamCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  
  const CANVAS_WIDTH = gridSize * CELL_SIZE;
  const CANVAS_HEIGHT = gridSize * CELL_SIZE;

  // Draw grid and points
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let i = 0; i <= gridSize; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_HEIGHT);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_WIDTH, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    // Y axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.stroke();

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.stroke();

    // Draw coordinate labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    const labelInterval = gridSize <= 10 ? 2 : gridSize <= 20 ? 5 : 10;
    for (let i = 0; i <= gridSize; i++) {
      if (i % labelInterval === 0) {
        // X axis labels
        ctx.fillText(i.toString(), i * CELL_SIZE, CANVAS_HEIGHT - 5);
        // Y axis labels (inverted for screen coordinates)
        ctx.fillText((gridSize - i).toString(), 10, i * CELL_SIZE + 4);
      }
    }

    // Draw start point
    if (startPoint) {
      const screenY = gridSize - startPoint.y;
      ctx.fillStyle = "#1e40af";
      ctx.fillRect(
        startPoint.x * CELL_SIZE + 2,
        screenY * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );
      
      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("S", startPoint.x * CELL_SIZE + CELL_SIZE / 2, screenY * CELL_SIZE + CELL_SIZE / 2 + 4);
    }

    // Draw end point
    if (endPoint) {
      const screenY = gridSize - endPoint.y;
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(
        endPoint.x * CELL_SIZE + 2,
        screenY * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );
      
      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("E", endPoint.x * CELL_SIZE + CELL_SIZE / 2, screenY * CELL_SIZE + CELL_SIZE / 2 + 4);
    }

    // Draw animated line pixels
    if (iterations.length > 0 && animationIndex > 0) {
      for (let i = 0; i < Math.min(animationIndex, iterations.length); i++) {
        const iter = iterations[i];
        const screenY = gridSize - iter.y;
        
        // Gradient effect for recently drawn pixels
        const opacity = Math.max(0.3, 1 - (animationIndex - i) * 0.1);
        
        ctx.fillStyle = `rgba(20, 184, 166, ${opacity})`;
        ctx.fillRect(
          iter.x * CELL_SIZE + 3,
          screenY * CELL_SIZE + 3,
          CELL_SIZE - 6,
          CELL_SIZE - 6
        );

        // Glow effect for the most recent pixel
        if (i === animationIndex - 1) {
          ctx.strokeStyle = "#14b8a6";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            iter.x * CELL_SIZE + 1,
            screenY * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
        }
      }
    }
  }, [startPoint, endPoint, iterations, animationIndex, gridSize]);

  // Animation effect
  useEffect(() => {
    if (iterations.length === 0) {
      setAnimationIndex(0);
      return;
    }

    if (animationIndex < iterations.length) {
      const timer = setTimeout(() => {
        setAnimationIndex((prev) => prev + 1);
      }, animationSpeed);
      return () => clearTimeout(timer);
    }
  }, [iterations, animationIndex, animationSpeed]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (startPoint && endPoint) return; // Both points already selected

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
    const y = gridSize - Math.floor((event.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      onPointSelect({ x, y });
    }
  };

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        className="border-2 border-border rounded-lg cursor-crosshair shadow-lg hover:shadow-glow transition-shadow"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

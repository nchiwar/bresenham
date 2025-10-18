import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Point } from "@/pages/Game";

interface CoordinateInputsProps {
  startPoint: Point | null;
  endPoint: Point | null;
  onStartPointChange: (point: Point) => void;
  onEndPointChange: (point: Point) => void;
  gridSize?: number;
}

export const CoordinateInputs = ({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
  gridSize = 20,
}: CoordinateInputsProps) => {
  const maxCoord = gridSize - 1;
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Coordinate Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x1">x₁ (Start X)</Label>
            <Input
              id="x1"
              type="number"
              min="0"
              max={maxCoord}
              value={startPoint?.x ?? ""}
              onChange={(e) => {
                const x = parseInt(e.target.value);
                if (!isNaN(x) && x >= 0 && x <= maxCoord) {
                  onStartPointChange({ x, y: startPoint?.y ?? 0 });
                }
              }}
              placeholder={`0-${maxCoord}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y1">y₁ (Start Y)</Label>
            <Input
              id="y1"
              type="number"
              min="0"
              max={maxCoord}
              value={startPoint?.y ?? ""}
              onChange={(e) => {
                const y = parseInt(e.target.value);
                if (!isNaN(y) && y >= 0 && y <= maxCoord) {
                  onStartPointChange({ x: startPoint?.x ?? 0, y });
                }
              }}
              placeholder={`0-${maxCoord}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="x2">x₂ (End X)</Label>
            <Input
              id="x2"
              type="number"
              min="0"
              max={maxCoord}
              value={endPoint?.x ?? ""}
              onChange={(e) => {
                const x = parseInt(e.target.value);
                if (!isNaN(x) && x >= 0 && x <= maxCoord) {
                  onEndPointChange({ x, y: endPoint?.y ?? 0 });
                }
              }}
              placeholder={`0-${maxCoord}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y2">y₂ (End Y)</Label>
            <Input
              id="y2"
              type="number"
              min="0"
              max={maxCoord}
              value={endPoint?.y ?? ""}
              onChange={(e) => {
                const y = parseInt(e.target.value);
                if (!isNaN(y) && y >= 0 && y <= maxCoord) {
                  onEndPointChange({ x: endPoint?.x ?? 0, y });
                }
              }}
              placeholder={`0-${maxCoord}`}
            />
          </div>
        </div>

        {startPoint && endPoint && (
          <div className="pt-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Selected Points:</p>
            <p>Start: ({startPoint.x}, {startPoint.y})</p>
            <p>End: ({endPoint.x}, {endPoint.y})</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

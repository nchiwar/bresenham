import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Grid3x3, Gauge } from "lucide-react";

export type GridSize = 10 | 20 | 30;
export type AnimationSpeed = "slow" | "normal" | "fast";

interface SettingsPanelProps {
  gridSize: GridSize;
  animationSpeed: AnimationSpeed;
  onGridSizeChange: (size: GridSize) => void;
  onAnimationSpeedChange: (speed: AnimationSpeed) => void;
}

const speedToMs: Record<AnimationSpeed, number> = {
  slow: 400,
  normal: 200,
  fast: 100,
};

export const getAnimationDelay = (speed: AnimationSpeed) => speedToMs[speed];

export const SettingsPanel = ({
  gridSize,
  animationSpeed,
  onGridSizeChange,
  onAnimationSpeedChange,
}: SettingsPanelProps) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Grid3x3 className="w-4 h-4" />
            Grid Size
          </Label>
          <Select
            value={gridSize.toString()}
            onValueChange={(value) => onGridSizeChange(parseInt(value) as GridSize)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10×10 (Beginner)</SelectItem>
              <SelectItem value="20">20×20 (Intermediate)</SelectItem>
              <SelectItem value="30">30×30 (Advanced)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Animation Speed
          </Label>
          <Select value={animationSpeed} onValueChange={(value) => onAnimationSpeedChange(value as AnimationSpeed)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow (400ms)</SelectItem>
              <SelectItem value="normal">Normal (200ms)</SelectItem>
              <SelectItem value="fast">Fast (100ms)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

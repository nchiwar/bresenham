import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BresenhamCalculations } from "@/pages/Game";

interface CalculationsPanelProps {
  calculations: BresenhamCalculations | null;
}

export const CalculationsPanel = ({ calculations }: CalculationsPanelProps) => {
  return (
    <Card className="border-2 border-accent/20 bg-accent/5">
      <CardHeader>
        <CardTitle>Algorithm Constants</CardTitle>
      </CardHeader>
      <CardContent>
        {calculations ? (
          <div className="grid grid-cols-2 gap-4 font-mono">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Δx</p>
                <p className="text-2xl font-bold text-primary">{calculations.dx}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Δy</p>
                <p className="text-2xl font-bold text-primary">{calculations.dy}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Slope</p>
                <p className="text-xl font-bold text-accent">{calculations.slope.toFixed(3)}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">2Δy</p>
                <p className="text-2xl font-bold text-secondary">{calculations.twoDy}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">2Δy - 2Δx</p>
                <p className="text-2xl font-bold text-secondary">{calculations.twoDyMinusTwoDx}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">P₀</p>
                <p className="text-xl font-bold text-accent">{calculations.p0}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select two points and click "Calculate Line"</p>
            <p className="text-sm mt-2">to see the algorithm constants</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

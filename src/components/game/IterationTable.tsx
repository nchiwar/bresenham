import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IterationRow } from "@/pages/Game";

interface IterationTableProps {
  iterations: IterationRow[];
}

export const IterationTable = ({ iterations }: IterationTableProps) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Iteration Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border bg-muted/50">
                <th className="p-3 text-left font-mono font-bold">k</th>
                <th className="p-3 text-left font-mono font-bold">Pₖ</th>
                <th className="p-3 text-left font-mono font-bold">x</th>
                <th className="p-3 text-left font-mono font-bold">y</th>
                <th className="p-3 text-left">Decision</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {iterations.map((row, index) => {
                const isLastRow = index === iterations.length - 1;
                const decision = isLastRow
                  ? "End point"
                  : row.pk < 0
                  ? "Pₖ < 0: increment x only"
                  : "Pₖ ≥ 0: increment both x and y";

                return (
                  <tr
                    key={row.k}
                    className={`border-b border-border hover:bg-accent/10 transition-colors ${
                      isLastRow ? "bg-success/10" : ""
                    }`}
                  >
                    <td className="p-3">{row.k}</td>
                    <td className="p-3">{isLastRow ? "-" : row.pk}</td>
                    <td className="p-3">{row.x}</td>
                    <td className="p-3">{row.y}</td>
                    <td className="p-3 text-sm text-muted-foreground">{decision}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="font-semibold mb-2">How to read this table:</p>
          <ul className="space-y-1 ml-4">
            <li>• <span className="font-mono">k</span>: Iteration number</li>
            <li>• <span className="font-mono">Pₖ</span>: Decision parameter value</li>
            <li>• <span className="font-mono">x, y</span>: Current pixel coordinates</li>
            <li>• Decision: Which direction to move next</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

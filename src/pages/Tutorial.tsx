import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Tutorial = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/game">
            <Button className="gap-2">
              <Gamepad2 className="w-4 h-4" />
              Try the Game
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Bresenham Line Algorithm Tutorial
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn how computers draw perfect lines on pixel grids
          </p>
        </div>

        {/* Tutorial Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">What is the Bresenham Algorithm?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                The Bresenham Line Drawing Algorithm is a computer graphics algorithm that determines which points 
                in a grid should be selected to form a close approximation to a straight line between two points.
              </p>
              <p className="text-lg leading-relaxed">
                Created by Jack E. Bresenham in 1962, it uses only integer arithmetic, making it extremely fast 
                and efficient - perfect for drawing lines on computer screens!
              </p>
            </CardContent>
          </Card>

          {/* The Math */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Understanding the Mathematics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">1. Calculate the Slope</h3>
                <p className="text-lg mb-2">Given two points (x₁, y₁) and (x₂, y₂), we first calculate:</p>
                <div className="bg-muted p-4 rounded-lg font-mono space-y-2">
                  <p>Δx = x₂ - x₁</p>
                  <p>Δy = y₂ - y₁</p>
                  <p>slope = Δy / Δx</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">2. Calculate Initial Decision Parameter</h3>
                <p className="text-lg mb-2">
                  The decision parameter helps us choose which pixel to select next:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono space-y-2">
                  <p>P₀ = 2Δy - Δx</p>
                </div>
                <p className="text-muted-foreground mt-2">
                  This determines whether we move diagonally or horizontally for the next pixel
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">3. Iterate Through Pixels</h3>
                <p className="text-lg mb-2">For each pixel along the line:</p>
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-semibold mb-1">If Pₖ &lt; 0:</p>
                    <div className="ml-4 font-mono space-y-1">
                      <p>• Select pixel at (xₖ + 1, yₖ)</p>
                      <p>• Pₖ₊₁ = Pₖ + 2Δy</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">If Pₖ ≥ 0:</p>
                    <div className="ml-4 font-mono space-y-1">
                      <p>• Select pixel at (xₖ + 1, yₖ + 1)</p>
                      <p>• Pₖ₊₁ = Pₖ + 2Δy - 2Δx</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example */}
          <Card className="border-2 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl">Example: Drawing a Line from (0,0) to (5,3)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-lg font-semibold text-accent">Step 1: Calculate Constants</p>
                <div className="bg-background p-4 rounded-lg font-mono space-y-2">
                  <p>Δx = 5 - 0 = 5</p>
                  <p>Δy = 3 - 0 = 3</p>
                  <p>2Δy = 6</p>
                  <p>2Δy - 2Δx = -4</p>
                  <p>P₀ = 2Δy - Δx = 1</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-lg font-semibold text-accent mb-3">Step 2: Iteration Table</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="p-3 text-left font-mono">k</th>
                        <th className="p-3 text-left font-mono">Pₖ</th>
                        <th className="p-3 text-left font-mono">(xₖ, yₖ)</th>
                        <th className="p-3 text-left">Decision</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr className="border-b border-border">
                        <td className="p-3">0</td>
                        <td className="p-3">1</td>
                        <td className="p-3">(0, 0)</td>
                        <td className="p-3 text-sm">P₀ ≥ 0, increment both</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3">1</td>
                        <td className="p-3">-3</td>
                        <td className="p-3">(1, 1)</td>
                        <td className="p-3 text-sm">P₁ &lt; 0, increment x only</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3">2</td>
                        <td className="p-3">3</td>
                        <td className="p-3">(2, 1)</td>
                        <td className="p-3 text-sm">P₂ ≥ 0, increment both</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3">3</td>
                        <td className="p-3">-1</td>
                        <td className="p-3">(3, 2)</td>
                        <td className="p-3 text-sm">P₃ &lt; 0, increment x only</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3">4</td>
                        <td className="p-3">5</td>
                        <td className="p-3">(4, 2)</td>
                        <td className="p-3 text-sm">P₄ ≥ 0, increment both</td>
                      </tr>
                      <tr>
                        <td className="p-3">5</td>
                        <td className="p-3">-</td>
                        <td className="p-3">(5, 3)</td>
                        <td className="p-3 text-sm">End point reached</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It's Efficient */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Why is Bresenham's Algorithm So Efficient?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-success text-2xl">✓</span>
                  <span><strong>Integer-only arithmetic:</strong> No floating-point calculations needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-2xl">✓</span>
                  <span><strong>Simple operations:</strong> Just addition, subtraction, and multiplication by 2</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-2xl">✓</span>
                  <span><strong>Fast execution:</strong> Perfect for real-time graphics rendering</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-2xl">✓</span>
                  <span><strong>Accurate results:</strong> Produces the best possible line approximation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center py-8">
            <p className="text-xl mb-6 text-muted-foreground">
              Ready to put your knowledge to the test?
            </p>
            <Link to="/game">
              <Button size="lg" className="gap-2">
                <Gamepad2 className="w-5 h-5" />
                Start Playing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;

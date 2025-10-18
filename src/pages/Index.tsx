import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gamepad2, GraduationCap, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Learning Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Master the Bresenham Algorithm
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Learn computer graphics line drawing through interactive tutorials and engaging games
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tutorial">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary-glow shadow-lg hover:shadow-glow transition-all">
                <BookOpen className="w-5 h-5" />
                Start Tutorial
              </Button>
            </Link>
            <Link to="/game">
              <Button size="lg" variant="outline" className="gap-2 border-2 hover:bg-accent/10">
                <Gamepad2 className="w-5 h-5" />
                Play Game
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:shadow-card transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Learn the Math</h3>
              <p className="text-muted-foreground">
                Understand slopes, decision parameters, and the mathematical foundation behind the algorithm
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-card transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Practice</h3>
              <p className="text-muted-foreground">
                Select points, calculate values, and watch your line come to life pixel by pixel
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-card transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Feedback</h3>
              <p className="text-muted-foreground">
                Get instant feedback and see animated visualizations of the algorithm in action
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
                <p className="text-muted-foreground">
                  Start with the tutorial to learn the concepts, or jump straight into the game if you're ready for hands-on practice
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Select Points & Calculate</h3>
                <p className="text-muted-foreground">
                  Click on the grid to select two points, then calculate the slope and algorithm constants
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-success-foreground font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Watch & Learn</h3>
                <p className="text-muted-foreground">
                  See the algorithm draw your line pixel by pixel with animated visualizations and real-time feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

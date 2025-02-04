import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, TrendingUp, Users } from "lucide-react";

export function StrategyPage() {
  const strategies = [
    {
      icon: Target,
      title: "Mission-Driven Approach",
      description: "Focused on improving healthcare outcomes through innovation"
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Continuous development of cutting-edge AI solutions"
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Building for sustainable, long-term success"
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "Prioritizing healthcare provider needs and feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Our Strategy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Building the future of healthcare automation through strategic innovation and partnership.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {strategies.map((strategy, i) => (
                <Card key={i} className="p-6 bg-card-custom">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-lg mb-4">
                      <strategy.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{strategy.title}</h3>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
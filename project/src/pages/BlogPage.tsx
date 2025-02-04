import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary/10 rounded-full">
                <Clock className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6 heading-glow">Coming Soon</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our blog is currently under development. Stay tuned for insightful articles about healthcare AI, automation, and industry trends.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
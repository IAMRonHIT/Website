import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <Card className="p-12 bg-card-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Healthcare's <span className="glow-text">first</span> smart system
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Transform healthcare workflows with AI-powered automation. Ron AI's Smart System approach delivers efficiency, cost savings, and improved patient outcomes through innovative technology.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              View Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
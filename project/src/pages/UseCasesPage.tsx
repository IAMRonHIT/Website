import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { FileCheck, Users, Hospital, Activity } from "lucide-react";

export function UseCasesPage() {
  const useCases = [
    {
      icon: FileCheck,
      title: "Prior Authorization",
      description: "Automated processing and approval of medical procedures"
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Streamlined patient data handling and care coordination"
    },
    {
      icon: Hospital,
      title: "Hospital Operations",
      description: "Optimized workflow management for healthcare facilities"
    },
    {
      icon: Activity,
      title: "Clinical Decisions",
      description: "AI-assisted clinical decision support and recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Use Cases</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Discover how Ron AI transforms healthcare operations across different specialties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase, i) => (
                <Card key={i} className="p-6 bg-card-custom">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-lg mb-4">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
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
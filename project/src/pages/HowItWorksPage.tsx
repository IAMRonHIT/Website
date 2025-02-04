import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { FileCheck, Brain, Bot, GitMerge } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataPreparationAnimation } from "@/components/animations/DataPreparationAnimation";
import { TokenizationAnimation } from "@/components/animations/TokenizationAnimation";
import { ModelTrainingAnimation } from "@/components/animations/ModelTrainingAnimation";
import { AgentDistillationAnimation } from "@/components/animations/AgentDistillationAnimation";
import { IntelAgentsAnimation } from "@/components/animations/IntelAgentsAnimation";

export function HowItWorksPage() {
  const steps = [
    {
      id: "data-preparation",
      icon: FileCheck,
      title: "Data Preparation",
      description: "Automated transformation of FHIR data into optimized JSONL format",
      content: (
        <div>
          <p className="text-muted-foreground mb-8">
            Our system transforms complex FHIR healthcare records into optimized JSONL format for processing.
          </p>
          <DataPreparationAnimation />
        </div>
      )
    },
    {
      id: "tokenization",
      icon: Brain,
      title: "Tokenization",
      description: "Breaking down text into machine-readable tokens",
      content: (
        <div>
          <p className="text-muted-foreground mb-8">
            Our AI system breaks down text into tokens for efficient processing.
          </p>
          <TokenizationAnimation />
        </div>
      )
    },
    {
      id: "model-training",
      icon: Bot,
      title: "Model Training",
      description: "Fine-tuning the LLM with client data",
      content: (
        <div>
          <p className="text-muted-foreground mb-8">
            Watch the AI model's initialization and optimization process.
          </p>
          <ModelTrainingAnimation />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Model Architecture",
                description: "Neural network layers and connections being initialized"
              },
              {
                title: "Weight Optimization",
                description: "Iterative parameter tuning and gradient updates"
              },
              {
                title: "Feature Extraction",
                description: "Learning hierarchical representations from input data"
              },
              {
                title: "Model Convergence",
                description: "Optimization process reaching stable performance metrics"
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "agent-distillation",
      icon: GitMerge,
      title: "Agent Distillation",
      description: "Knowledge transfer to specialized agents",
      content: (
        <div>
          <p className="text-muted-foreground mb-8">
            Watch as specialized healthcare agents are created through knowledge distillation.
          </p>
          <AgentDistillationAnimation />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Knowledge Transfer",
                description: "Core LLM orchestrates knowledge transfer to specialized agents"
              },
              {
                title: "Agent Specialization",
                description: "Agents evolve into experts in their designated domains"
              },
              {
                title: "Validation Process",
                description: "Comprehensive testing ensures agent proficiency"
              },
              {
                title: "System Integration",
                description: "Agents form an intelligent, interconnected framework"
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "intel-agents",
      icon: Bot,
      title: "IntellAgents",
      description: "Multi-agent framework in action",
      content: (
        <div>
          <p className="text-muted-foreground mb-8">
            Watch as the core LLM orchestrates a powerful multi-agent framework, creating specialized healthcare agents that work in harmony.
          </p>
          <IntelAgentsAnimation />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Intelligent Orchestration",
                description: "LLM coordinates specialized agents for optimal workflow"
              },
              {
                title: "Real-time Processing",
                description: "Agents handle healthcare tasks simultaneously"
              },
              {
                title: "Human Feedback Loop",
                description: "Continuous learning from user interactions"
              },
              {
                title: "Adaptive System",
                description: "Framework evolves based on outcomes and feedback"
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Ron AI streamlines healthcare workflows through intelligent automation.
            </p>
          </div>

          <Tabs defaultValue="data-preparation" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-transparent h-auto p-0 mb-8">
              {steps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border data-[state=active]:border-primary/50 h-auto py-4 px-6"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <step.icon className="h-6 w-6" />
                    <span className="font-semibold">{step.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id}>
                <Card className="p-8 bg-card-custom">
                  <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                  {step.content}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </section>
    </div>
  );
}
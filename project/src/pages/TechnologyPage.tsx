import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Cloud, Shield, Database, Network, Cpu, Lock, Key, FileCode, Workflow, GitMerge, Layers, Zap } from "lucide-react";

export function TechnologyPage() {
  const infrastructure = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Enterprise-grade cloud platform with global availability"
    },
    {
      icon: Shield,
      title: "Security",
      description: "End-to-end encryption and advanced security measures"
    },
    {
      icon: Database,
      title: "Data Storage",
      description: "Secure, redundant storage with geographical distribution"
    },
    {
      icon: Network,
      title: "Network",
      description: "High-performance network with low latency access"
    }
  ];

  const aiCapabilities = [
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Advanced machine learning models and neural networks"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Intelligent process automation and optimization"
    },
    {
      icon: Layers,
      title: "Multi-Agent System",
      description: "Coordinated AI agents for complex tasks"
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Instant processing and decision making"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Our Technology</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Built on cutting-edge technology to deliver enterprise-grade reliability and performance.
            </p>
            
            <div className="space-y-16">
              <div>
                <h2 className="text-2xl font-bold mb-8">Infrastructure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {infrastructure.map((item, i) => (
                    <Card key={i} className="p-6 bg-card-custom">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-lg mb-4">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-8">AI Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {aiCapabilities.map((item, i) => (
                    <Card key={i} className="p-6 bg-card-custom">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-lg mb-4">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Brain, Network, Lock, Zap, Users, Layers, MessageSquare, LineChart, Cpu, Shield, Database, Bot, Workflow, GitMerge, FileSearch, Bell } from "lucide-react";

export function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Prior Authorization",
      description: "Automated review and approval of prior authorization requests using advanced natural language processing."
    },
    {
      icon: Network,
      title: "Multi-Agent Architecture",
      description: "14-16 specialized AI agents working in harmony to optimize healthcare processes."
    },
    {
      icon: Lock,
      title: "Enterprise-Grade Security",
      description: "End-to-end encryption, role-based access control, and HIPAA compliance built into every feature."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant analysis and decision-making capabilities that reduce wait times from days to minutes."
    }
  ];

  const automationFeatures = [
    {
      icon: Bot,
      title: "Intelligent Intake",
      description: "Automated ingestion and processing of prior authorization requests from multiple sources."
    },
    {
      icon: Workflow,
      title: "Smart Routing",
      description: "Intelligent case routing based on complexity, urgency, and staff expertise."
    },
    {
      icon: GitMerge,
      title: "Automated Matching",
      description: "Pattern recognition for matching requests against approval criteria."
    },
    {
      icon: FileSearch,
      title: "Document Analysis",
      description: "Advanced OCR and natural language processing for comprehensive document review."
    }
  ];

  const integrationFeatures = [
    {
      icon: Database,
      title: "Seamless Integration",
      description: "Easy integration with existing EHR systems and payer platforms through standardized APIs."
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Centralized platform for provider-payer communication with real-time updates."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Proactive alerts and reminders to keep workflows moving efficiently."
    }
  ];

  const analyticsFeatures = [
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics dashboard for tracking key metrics."
    },
    {
      icon: Users,
      title: "User Insights",
      description: "Detailed analytics on user behavior and system usage patterns."
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Real-time tracking of regulatory compliance and performance standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">
              Powerful Features for Healthcare Innovation
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Discover how Ron AI's comprehensive feature set transforms healthcare workflows through intelligent automation and advanced AI capabilities.
            </p>
          </div>
        </Card>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">Core Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our platform's foundation is built on powerful AI capabilities that drive efficiency and accuracy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-[#00F0FF]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Automation Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">Intelligent Automation</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Streamline your workflows with advanced automation capabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {automationFeatures.map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-[#00F0FF]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Integration Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">Seamless Integration</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Connect and communicate effortlessly with existing healthcare systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrationFeatures.map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-[#00F0FF]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Analytics Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">Advanced Analytics</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Gain valuable insights with comprehensive reporting and analytics tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {analyticsFeatures.map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-[#00F0FF]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#00D1DE] bg-clip-text text-transparent">Why Choose Ron AI</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              See how our comprehensive feature set delivers value across your organization.
            </p>
            <div className="aspect-video max-w-4xl mx-auto bg-[#111111]/80 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80"
                alt="Feature Comparison"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
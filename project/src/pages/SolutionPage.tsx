import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Database, Network, Clock, Bot, Activity, CalendarClock, CheckCircle, AlertTriangle, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as React from "react";

export function SolutionPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Intelligent automation of healthcare workflows using advanced AI models"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "HIPAA-compliant security with end-to-end encryption"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Secure, scalable data storage with FHIR compliance"
    },
    {
      icon: Network,
      title: "API Integration",
      description: "Seamless integration with existing healthcare systems"
    },
    {
      icon: Bot,
      title: "Multi-Agent System",
      description: "Coordinated AI agents for complex healthcare tasks"
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description: "Instant insights and performance monitoring"
    }
  ];

  const timelineEvents = [
    {
      date: "January 2024",
      title: "Final Rule Published",
      description: "CMS publishes the Interoperability and Prior Authorization Final Rule",
      status: "completed"
    },
    {
      date: "Q2 2024",
      title: "Initial Assessment",
      description: "Healthcare organizations begin compliance assessment and planning",
      status: "in-progress"
    },
    {
      date: "January 2026",
      title: "Phase 1 Deadline",
      description: "Implementation of Patient Access API and Provider Access API",
      status: "upcoming"
    },
    {
      date: "January 2027",
      title: "Full Compliance",
      description: "Complete implementation of all APIs and automation requirements",
      status: "upcoming"
    }
  ];

  const implementationSteps = [
    {
      title: "Assessment & Planning",
      description: "Comprehensive evaluation of current systems and compliance requirements",
      items: [
        "System architecture review",
        "Gap analysis",
        "Resource allocation",
        "Timeline development"
      ]
    },
    {
      title: "Technical Implementation",
      description: "Development and integration of required APIs and automation systems",
      items: [
        "API development",
        "FHIR implementation",
        "Security measures",
        "Testing protocols"
      ]
    },
    {
      title: "Compliance Validation",
      description: "Ensuring all implementations meet regulatory requirements",
      items: [
        "Security audits",
        "Performance testing",
        "Documentation review",
        "Certification process"
      ]
    },
    {
      title: "Deployment & Training",
      description: "Rolling out the solution and ensuring proper usage",
      items: [
        "Staff training",
        "Phased deployment",
        "Monitoring setup",
        "Support system"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 heading-glow">Our Solution</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive healthcare automation platform powered by advanced AI technology,
              designed to meet CMS Final Rule requirements and transform healthcare operations.
            </p>
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => navigate('/contact')}
            >
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </section>

      {/* Feature Carousel */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how Ron AI transforms healthcare operations.
            </p>
          </div>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="p-6 bg-card-custom h-full">
                      <div className="flex flex-col items-center text-center h-full">
                        <div className="p-3 bg-primary/10 rounded-lg mb-4">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-12 top-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2" />
              </div>
            </Carousel>
          </div>
        </Card>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compliance Timeline</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key deadlines and milestones for CMS Final Rule implementation.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border hidden md:block" />
            <div className="space-y-8 md:space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0
                      ? 'md:flex-row-reverse'
                      : ''
                  }`}
                >
                  <div className="hidden md:block absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
                  <div className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0
                      ? 'md:ml-auto md:pl-8'
                      : 'md:mr-auto md:pr-8'
                  }`}>
                    <Card className="p-6 bg-card-custom">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <CalendarClock className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium text-primary">{event.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                        <div className="flex items-center mt-4">
                          {event.status === "upcoming" ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                          )}
                          <span className="text-sm capitalize text-muted-foreground">{event.status}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Implementation Steps */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Implementation Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our structured approach to ensuring successful deployment.
            </p>
          </div>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {implementationSteps.map((step, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 pl-4">
                    <Card className="p-6 bg-card-custom h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg mr-3">
                            <Workflow className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="space-y-2 mt-auto">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 mr-2" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-12 top-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2" />
              </div>
            </Carousel>
          </div>
        </Card>
      </section>
    </div>
  );
}
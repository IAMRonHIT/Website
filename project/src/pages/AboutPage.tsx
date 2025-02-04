import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Brain, Users, Target, Award, ChevronRight } from "lucide-react";

export function AboutPage() {
  const team = [
    {
      name: "Tim Hunter",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=800&h=800&q=80",
      bio: "Former Director of AI at a leading healthcare technology company with 15+ years of experience in healthcare innovation."
    },
    {
      name: "Natalie Schwartz",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=800&h=800&q=80",
      bio: "PhD in Machine Learning from Stanford, previously led AI research teams at major tech companies."
    },
    {
      name: "Abigail Mitchell",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?fit=crop&w=800&h=800&q=80",
      bio: "Board-certified physician with expertise in clinical informatics and healthcare quality improvement."
    }
  ];

  const timeline = [
    {
      year: "2022",
      quarter: "Q3",
      title: "Foundation",
      description: "Ron AI founded with a vision to transform healthcare workflows"
    },
    {
      year: "2022",
      quarter: "Q4",
      title: "Data Foundation",
      description: "Development of core data infrastructure and AI architecture"
    },
    {
      year: "2023",
      quarter: "Q1",
      title: "API Development",
      description: "Launch of RESTful API architecture and FHIR compliance"
    },
    {
      year: "2023",
      quarter: "Q2",
      title: "Pilot Program",
      description: "Successful pilot with leading healthcare providers"
    },
    {
      year: "2023",
      quarter: "Q3",
      title: "Microsoft NVIDIA Partnership",
      description: "Selected for Microsoft NVIDIA Healthcare Accelerator"
    },
    {
      year: "2023",
      quarter: "Q4",
      title: "Market Launch",
      description: "Official launch of Ron AI platform"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">About Ron AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing healthcare workflows through intelligent automation. As a member of the Microsoft NVIDIA Healthcare Accelerator, we're building the next generation of AI-powered healthcare solutions.
            </p>
          </div>
        </Card>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-12 bg-card-custom">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground">
              To transform healthcare workflows through innovative AI solutions, making healthcare delivery more efficient, accurate, and patient-centered.
            </p>
          </Card>

          <Card className="p-12 bg-card-custom">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground">
              To become the intelligent infrastructure that powers modern healthcare delivery, enabling better patient outcomes through advanced AI technology.
            </p>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Leadership Team</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team brings together expertise in artificial intelligence, healthcare technology, and clinical practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Journey</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From inception to market leadership, follow our journey of innovation and growth.
            </p>
          </div>
          <div className="space-y-8">
            {timeline.map((event, i) => (
              <div key={i} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <div className="text-sm font-semibold">{event.year}</div>
                    <div className="text-xs text-muted-foreground">{event.quarter}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                  <Card className="flex-grow p-6 bg-card-custom">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
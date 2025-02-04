import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Activity, Shield, ArrowRight, LineChart, Eye, Mail, Phone, MapPin, Github, Twitter, Award, Cpu, Network, Users, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";

export function HomePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const team = [
    {
      name: "Tim Hunter MBA, MS, RN, CCM, NEA-BC, CSPO",
      role: "Chief Executive Officer",
      image: "https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMmlTVHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--ef2f8310086f0eef0706c05709c52eab852ff3d4/Tim.jpg",
      bio: "Board Certified Case Manager, Nurse Executive with expertise in AI Product Management"
    },
    {
      name: "Natalie Schwartz MD, MS, FACE, CPE",
      role: "Chief Medical Officer",
      image: "https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNk9SVHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2ffa57b08540c515860c1683f1e204f0e3b2e719/Natalie.jpg",
      bio: "Board certified senior medical director, and population health subject matter expert"
    },
    {
      name: "Abigail Mitchell DHEd, MSN, MBA, CNE, RN, FHERDSA",
      role: "Chief Research Officer",
      bio: "Nursing Educator and Scholar with subject matter expertise in Research & Development"
    },
    {
      name: "Bill Philbrick JD, L.LM ",
      role: "Chief Compliance Officer",
      image: "https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNENSVHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--12a939c67d3aaff9e061f2d76b72948fe9b012d8/Bill.jpg",
      bio: "Lawyer and Global Health consultant with subject matter expertise in AI Governance"
    },
    {
      name: "Michael Thorn APRN, DNP",
      role: "Strategic Advisor",
      image: "https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNVdSVHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fd99809e34fc40941ed01d7b4dbfb9fc1f4a09c7/michael-thorn-jr-rochester-mn.jpg",
      bio: "Advanced Practice Nurse Practitioner with subject matter expertise in innoovation and operations"
    },
    {
      name: "Nicole Zonin, MSN, RN, NEA-BC, EMT",
      role: "Chief Clinical Officer",
      image: "https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMHlTVHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--05f8b0bf1f5c60bd005485a09badbfe85b779226/download.jpeg",
      bio: "Nurse Executive with sujbect matter expertise in Utilization Review and Case Management"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Hero Section */}
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

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
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

      {/* Key Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Card className="p-8 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Differentiators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform leverages cutting-edge AI technology to revolutionize healthcare workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Client-Specific Fine-Tuning",
                description: "AI models tailored to your unique patient data and workflows"
              },
              {
                icon: Network,
                title: "Multi-Agent Architecture",
                description: "Specialized AI agents working in harmony to optimize processes"
              },
              {
                icon: Activity,
                title: "Seamless Integration",
                description: "Easy integration with existing EHRs and payer platforms"
              },
              {
                icon: Eye,
                title: "Proactive Intelligence",
                description: "Predictive analytics for optimized treatment plans"
              },
              {
                icon: Shield,
                title: "Quality & Compliance",
                description: "Built-in industry standards and HIPAA compliance"
              },
              {
                icon: Cpu,
                title: "Human-AI Collaboration",
                description: "Real-time interaction and feedback mechanisms"
              }
            ].map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Leadership Team</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Our team brings together expertise in artificial intelligence, healthcare technology, and clinical practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {team.map((member, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-4 font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <Card className="p-8 bg-card-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Operations?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join leading healthcare organizations in revolutionizing their workflows with Ron AI's intelligent automation platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => navigate('/contact')}
              >
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-start">
              <img
                src={theme === 'dark' 
                src={theme === 'dark'
                src={theme === 'dark'
                src={theme === 'dark'
                src={theme === 'dark' ? "/Default.jpg" : "/Variant2.png"}
                alt="Ron AI"
                className="h-32 w-auto"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" onClick={() => navigate('/about')}>About</Button></li>
                <li><Button variant="link" onClick={() => navigate('/blog')}>Blog</Button></li>
                <li><Button variant="link" onClick={() => navigate('/contact')}>Contact</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Button variant="link" onClick={() => navigate('/features')}>Features</Button></li>
                <li><Button variant="link" onClick={() => navigate('/technology')}>Technology</Button></li>
                <li><Button variant="link" onClick={() => navigate('/compliance')}>Compliance</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ron AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
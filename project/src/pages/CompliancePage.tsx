{/* Full updated CompliancePage.tsx code with correct card styling */}
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Shield, Lock, FileCheck, Users, Eye, Key, AlertTriangle, History, Database, Network, CheckCircle, FileText } from "lucide-react";

export function CompliancePage() {
  const standards = [
    {
      icon: Shield,
      title: "HIPAA Compliance",
      description: "Full compliance with Health Insurance Portability and Accountability Act requirements for PHI protection."
    },
    {
      icon: Lock,
      title: "HITECH Act",
      description: "Adherence to Health Information Technology for Economic and Clinical Health Act standards."
    },
    {
      icon: FileCheck,
      title: "SOC 2 Type II",
      description: "Annual third-party audits ensuring security, availability, and confidentiality controls."
    },
    {
      icon: Users,
      title: "GDPR Ready",
      description: "Built-in support for General Data Protection Regulation requirements and data subject rights."
    }
  ];

  const security = [
    {
      icon: Lock,
      title: "Encryption",
      features: [
        "AES-256 encryption at rest",
        "TLS 1.3 encryption in transit",
        "End-to-end encryption for sensitive data",
        "Customer-managed encryption keys"
      ]
    },
    {
      icon: Key,
      title: "Access Control",
      features: [
        "Role-based access control (RBAC)",
        "Multi-factor authentication",
        "Single sign-on integration",
        "Granular permissions system"
      ]
    },
    {
      icon: Eye,
      title: "Monitoring",
      features: [
        "24/7 security monitoring",
        "Real-time threat detection",
        "Automated incident response",
        "Security information and event management"
      ]
    },
    {
      icon: History,
      title: "Audit Trails",
      features: [
        "Comprehensive activity logging",
        "Immutable audit records",
        "Access attempt tracking",
        "Change management documentation"
      ]
    }
  ];

  const dataProtection = [
    {
      icon: Database,
      title: "Data Storage",
      description: "Secure, redundant storage with geographical distribution and automated backups."
    },
    {
      icon: Network,
      title: "Data Transfer",
      description: "Encrypted data transmission with secure protocols and network isolation."
    },
    {
      icon: AlertTriangle,
      title: "Breach Prevention",
      description: "Advanced threat detection and prevention systems with automated responses."
    },
    {
      icon: CheckCircle,
      title: "Data Integrity",
      description: "Checksums and validation to ensure data accuracy and prevent tampering."
    }
  ];

  const compliance = [
    {
      title: "Privacy Compliance",
      items: [
        "Privacy impact assessments",
        "Data protection officer assignment",
        "Privacy by design implementation",
        "Regular privacy audits"
      ]
    },
    {
      title: "Security Compliance",
      items: [
        "Security risk assessments",
        "Vulnerability management",
        "Penetration testing",
        "Security awareness training"
      ]
    },
    {
      title: "Operational Compliance",
      items: [
        "Business continuity planning",
        "Disaster recovery procedures",
        "Incident response planning",
        "Change management protocols"
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
            <h1 className="text-4xl font-bold mb-6">Security & Compliance</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ron AI maintains the highest standards of security and regulatory compliance to protect sensitive healthcare data and ensure patient privacy.
            </p>
          </div>
        </Card>
      </section>

      {/* Standards & Certifications */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Standards & Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform adheres to the highest industry standards and maintains key certifications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    <standard.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security measures protecting your sensitive data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {security.map((feature, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-4">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.features.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Data Protection */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Data Protection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiple layers of protection for your sensitive healthcare data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataProtection.map((item, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Compliance Programs */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compliance Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive compliance programs ensuring regulatory adherence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {compliance.map((program, i) => (
              <Card key={i} className="p-6 bg-card-custom">
                <div className="text-center">
                  <h3 className="font-semibold mb-4">{program.title}</h3>
                  <ul className="space-y-2">
                    {program.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Documentation */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Compliance Documentation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Access our detailed compliance documentation and certifications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { icon: FileText, title: "Security Whitepaper" },
                { icon: Shield, title: "Compliance Guide" },
                { icon: FileCheck, title: "Certification Documents" },
                { icon: Key, title: "Privacy Policy" }
              ].map((doc, i) => (
                <Card key={i} className="p-4 bg-card-custom">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <doc.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{doc.title}</span>
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
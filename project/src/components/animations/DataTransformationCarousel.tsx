import { useState, useEffect } from 'react';
import { FileText, Database, CheckCircle, Workflow, Network, Brain } from 'lucide-react';
import { ProcessStageCard } from './ProcessStageCard';

const stages = [
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Data Ingestion",
    description: "FHIR healthcare records are collected and prepared for processing"
  },
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "Data Normalization",
    description: "Records are standardized and cleaned for consistency"
  },
  {
    icon: <Workflow className="w-6 h-6 text-primary" />,
    title: "Structure Mapping",
    description: "Data is mapped to optimized JSONL format"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: "Validation",
    description: "Ensuring data quality and format compliance"
  },
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: "Integration",
    description: "Connecting with downstream AI systems"
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI Processing",
    description: "Ready for machine learning model training"
  }
];

export function DataTransformationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % stages.length);
        setIsTransitioning(false);
      }, 700); // Match this with CSS transition duration
    }, 5000); // Change stage every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ${
              Math.abs(index - activeIndex) <= 2 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ProcessStageCard
              title={stage.title}
              description={stage.description}
              icon={stage.icon}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>
      
      {/* Progress Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {stages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-700 ${
              index === activeIndex
                ? 'w-8 bg-primary'
                : 'bg-primary/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
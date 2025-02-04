import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/ui/card';

interface ProcessStageCardProps {
  title: string;
  description: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export function ProcessStageCard({ title, description, isActive, icon }: ProcessStageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    if (isActive) {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = isDark 
        ? '0 0 30px rgba(0, 240, 255, 0.2)' 
        : '0 0 30px rgba(0, 54, 73, 0.15)';
    } else {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = 'none';
    }
  }, [isActive, isDark]);

  return (
    <Card
      ref={cardRef}
      className={`p-6 bg-card-custom transition-all duration-700 ease-in-out ${
        isActive ? 'border-primary' : 'border-border'
      }`}
      style={{
        background: isDark 
          ? 'linear-gradient(145deg, rgba(0, 240, 255, 0.1), rgba(0, 0, 0, 0.2))' 
          : 'linear-gradient(145deg, rgba(0, 54, 73, 0.1), rgba(255, 255, 255, 0.2))'
      }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full transition-all duration-700 ${
          isActive 
            ? isDark 
              ? 'bg-[rgba(0,240,255,0.15)] shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
              : 'bg-[rgba(0,54,73,0.15)] shadow-[0_0_15px_rgba(0,54,73,0.3)]'
            : 'bg-muted'
        }`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
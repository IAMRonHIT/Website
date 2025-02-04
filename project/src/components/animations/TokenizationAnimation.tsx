import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface Token {
  text: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  stage: number;
  opacity: number;
  scale: number;
  id?: number;
  splitType?: 'train' | 'validation' | 'test';
}

export function TokenizationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let tokens: Token[] = [];
    const stages = ['Input', 'Split', 'Subwords', 'Tokens'];
    const sampleText = "Healthcare AI";
    const subwords = ["health", "care", "A", "I"];
    const tokenIds = [2847, 1839, 15, 23];

    const handleResize = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      const width = canvas.clientWidth * ratio;
      const height = canvas.clientHeight * ratio;
      
      canvas.width = width;
      canvas.height = height;
      ctx.scale(ratio, ratio);

      // Initialize tokens
      tokens = [
        // Initial text
        { text: sampleText, x: width * 0.2, y: height * 0.5, targetX: width * 0.2, targetY: height * 0.5, stage: 0, opacity: 1, scale: 1 },
        // Split sections with percentages
        { text: "Train 80%", x: width * 0.4, y: height * 0.3, targetX: width * 0.4, targetY: height * 0.3, stage: 1, opacity: 0, scale: 0, splitType: 'train' },
        { text: "Validation 10%", x: width * 0.4, y: height * 0.5, targetX: width * 0.4, targetY: height * 0.5, stage: 1, opacity: 0, scale: 0, splitType: 'validation' },
        { text: "Test 10%", x: width * 0.4, y: height * 0.7, targetX: width * 0.4, targetY: height * 0.7, stage: 1, opacity: 0, scale: 0, splitType: 'test' },
        // Subwords
        ...subwords.map((word, i) => ({
          text: word,
          x: width * 0.6,
          y: height * 0.25 + i * 45,
          targetX: width * 0.6,
          targetY: height * 0.25 + i * 45,
          stage: 2,
          opacity: 0,
          scale: 0
        })),
        // Token IDs
        ...tokenIds.map((id, i) => ({
          text: `#${id}`,
          x: width * 0.8,
          y: height * 0.25 + i * 45,
          targetX: width * 0.8,
          targetY: height * 0.25 + i * 45,
          stage: 3,
          opacity: 0,
          scale: 0,
          id
        }))
      ];
    };

    const drawToken = (token: Token) => {
      const glow = isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 54, 73, 0.2)';
      const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
      const boxColor = isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 54, 73, 0.1)';
      const borderColor = isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 54, 73, 0.3)';

      ctx.save();
      ctx.globalAlpha = token.opacity;
      ctx.translate(token.x, token.y);
      ctx.scale(token.scale, token.scale);

      // Text metrics
      ctx.font = '16px system-ui';
      const metrics = ctx.measureText(token.text);
      const padding = 12;
      const boxWidth = metrics.width + padding * 2;
      const boxHeight = 30;

      // Draw box with glow
      ctx.shadowColor = glow;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(-boxWidth/2, -boxHeight/2, boxWidth, boxHeight, 8);
      ctx.fillStyle = boxColor;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.shadowBlur = 0;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(token.text, 0, 0);

      // Draw token ID if present
      if (token.id !== undefined && token.stage === 3) {
        ctx.font = '12px system-ui';
        ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(0, 54, 73, 0.6)';
        ctx.fillText(`Token ID: ${token.id}`, 0, boxHeight);
      }

      ctx.restore();
    };

    let currentStage = 0;
    let stageTimer = 0;
    const stageDelay = 2000; // 2 seconds per stage

    const updateTokens = () => {
      const time = Date.now();
      
      // Update stage
      if (time - stageTimer > stageDelay) {
        currentStage = (currentStage + 1) % stages.length;
        stageTimer = time;
      }

      // Update tokens
      tokens.forEach(token => {
        // Fade in/out based on stage
        if (token.stage === currentStage) {
          token.opacity += (1 - token.opacity) * 0.1;
          token.scale += (1 - token.scale) * 0.1;
        } else {
          token.opacity += (0 - token.opacity) * 0.1;
          token.scale += (0 - token.scale) * 0.1;
        }

        // Add gentle floating motion
        token.y = token.targetY + Math.sin(time * 0.002 + token.x * 0.01) * 2;
      });
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      
      // Draw stage labels
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      stages.forEach((stage, i) => {
        const x = width * (0.2 + i * 0.2);
        ctx.fillStyle = i === currentStage 
          ? (isDark ? 'rgba(0, 240, 255, 0.9)' : 'rgba(0, 54, 73, 0.9)')
          : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)');
        ctx.fillText(stage, x, height - 20);

        // Draw stage indicator dot
        ctx.beginPath();
        ctx.arc(x, height - 40, 4, 0, Math.PI * 2);
        ctx.fillStyle = i === currentStage
          ? (isDark ? 'rgba(0, 240, 255, 0.9)' : 'rgba(0, 54, 73, 0.9)')
          : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)');
        ctx.fill();
      });

      // Draw connecting arrows
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 54, 73, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < stages.length - 1; i++) {
        const x1 = width * (0.25 + i * 0.2);
        const x2 = width * (0.35 + i * 0.2);
        const y = height * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Draw arrow head
        const arrowSize = 8;
        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(x2 - arrowSize, y - arrowSize);
        ctx.lineTo(x2 - arrowSize, y + arrowSize);
        ctx.closePath();
        ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 54, 73, 0.1)';
        ctx.fill();
      }

      updateTokens();
      tokens.forEach(drawToken);
      
      animationFrameId = requestAnimationFrame(draw);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[300px] rounded-lg"
      style={{
        background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      }}
    />
  );
}
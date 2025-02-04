import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface DataCard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  type: 'fhir' | 'jsonl';
  stage: number;
  opacity: number;
  scale: number;
  content: string;
  transformProgress: number;
}

interface ProcessingCenter {
  x: number;
  y: number;
  width: number;
  height: number;
  glowIntensity: number;
  progress: number;
}

export function DataPreparationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Stage definitions for the glassomorphic cards.
  const stages = [
    { label: 'FHIR Input', description: 'Healthcare Records' },
    { label: 'Processing', description: 'Data Transformation' },
    { label: 'JSONL Output', description: 'LLM Training Format' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let cards: DataCard[] = [];
    let processingCenter: ProcessingCenter;
    const cardWidth = 60;
    const cardHeight = 40;
    const fhirExamples = [
      '{"resourceType":"Patient"}',
      '{"resourceType":"Observation"}',
      '{"resourceType":"Procedure"}'
    ];
    const jsonlExamples = [
      '{"prompt":"Patient history","completion":"..."}',
      '{"prompt":"Clinical notes","completion":"..."}',
      '{"prompt":"Medical record","completion":"..."}'
    ];

    // Set up canvas dimensions (using devicePixelRatio) and initialize the scene.
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const clientWidth = canvas.clientWidth;
      const clientHeight = canvas.clientHeight;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Define the processing center and lift it upward by 50px.
      processingCenter = {
        x: clientWidth / 2,
        y: clientHeight / 2 - 50,
        width: clientWidth * 0.3,
        height: clientHeight * 0.6,
        glowIntensity: 0,
        progress: 0
      };

      // Initialize cards (all starting as FHIR).
      cards = fhirExamples.map((content, i) => ({
        x: clientWidth * 0.2,
        y: clientHeight / 2 + (i - 1) * 60,
        vx: 0,
        vy: 0,
        targetX: clientWidth * 0.2,
        targetY: clientHeight / 2 + (i - 1) * 60,
        type: 'fhir' as const,
        stage: 0,
        opacity: 1,
        scale: 1,
        content,
        transformProgress: 0
      }));
    };

    // Draw the processing center.
    const drawProcessingCenter = () => {
      const { x, y, width, height, glowIntensity, progress } = processingCenter;
      const glow = isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 54, 73, 0.2)';
      const buildingColor = isDark ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 54, 73, 0.8)';
      const bgColor = isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 54, 73, 0.05)';

      ctx.save();
      ctx.shadowColor = glow;
      ctx.shadowBlur = 20 + glowIntensity * 10;

      ctx.beginPath();
      ctx.roundRect(x - width / 2, y - height / 2, width, height, 16);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.strokeStyle = buildingColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw a progress bar.
      ctx.beginPath();
      ctx.roundRect(x - width / 3, y + height / 4, (width * 2) / 3 * progress, 6, 3);
      ctx.fillStyle = buildingColor;
      ctx.fill();

      // Draw a dashed line representing a conveyor belt.
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x + width / 2, y);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = buildingColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw center labels.
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
      ctx.fillText('Data Processing Center', x, y - height / 3);
      ctx.fillText('FHIR → JSONL Conversion', x, y - height / 3 + 25);
      ctx.font = '12px system-ui';
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
      ctx.fillText('Preparing data for LLM fine-tuning', x, y + height / 3 + 30);
      ctx.restore();
    };

    // Draw an individual data card.
    const drawCard = (card: DataCard) => {
      const glow = isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 54, 73, 0.2)';
      const baseColor = isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 54, 73, 0.1)';
      const borderColor = isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 54, 73, 0.3)';
      const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

      ctx.save();
      ctx.translate(card.x, card.y);
      ctx.scale(card.scale, card.scale);
      ctx.shadowColor = glow;
      ctx.shadowBlur = 15;

      const progress = card.transformProgress;
      const currentColor =
        card.type === 'fhir'
          ? `rgba(${Math.floor(progress * 255)}, ${Math.floor(196 - progress * 73)}, ${Math.floor(159 - progress * 66)}, 0.2)`
          : baseColor;

      ctx.beginPath();
      ctx.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 8);
      ctx.fillStyle = currentColor;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      const fontSize = 10 - progress * 2;
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      const displayContent =
        progress < 0.5 ? card.content.slice(0, 15) + '...' : jsonlExamples[0].slice(0, 15) + '...';
      ctx.fillText(displayContent, 0, 0);

      ctx.font = '12px system-ui';
      ctx.fillStyle = progress < 0.5 ? '#00C49F' : '#FF8042';
      ctx.fillText(card.type.toUpperCase(), 0, -cardHeight / 2 - 8);
      ctx.restore();
    };

    // Draw a glassomorphic stage card.
    const drawStageCard = (
      x: number,
      y: number,
      w: number,
      h: number,
      stage: { label: string; description: string }
    ) => {
      ctx.save();
      // Glass-like background.
      ctx.fillStyle = isDark ? 'rgba(20, 20, 20, 0.5)' : 'rgba(255, 255, 255, 0.5)';
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 54, 73, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 10);
      ctx.fill();
      ctx.stroke();

      // Draw stage text.
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(stage.label, x + w / 2, y + 4);
      ctx.font = '12px system-ui';
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
      ctx.fillText(stage.description, x + w / 2, y + 24);
      ctx.restore();
    };

    // Update cards and ensure FHIR cards are converted to JSONL.
    const updateCards = () => {
      const clientWidth = canvas.clientWidth;
      const time = performance.now() / 1000;
      const centerX = processingCenter.x;
      const centerY = processingCenter.y;

      // Remove off-screen cards.
      cards = cards.filter((card) => card.opacity > 0);

      // Spawn new FHIR cards if needed.
      if (cards.filter(c => c.type === 'fhir').length < 3) {
        cards.push({
          x: clientWidth * 0.1,
          y: processingCenter.y,
          vx: 1,
          vy: 0,
          targetX: clientWidth * 0.8,
          targetY: processingCenter.y,
          type: 'fhir',
          stage: 0,
          opacity: 1,
          scale: 1,
          content: fhirExamples[Math.floor(Math.random() * fhirExamples.length)],
          transformProgress: 0
        });
      }

      cards.forEach((card) => {
        const dx = centerX - card.x;
        const dy = centerY - card.y;
        const distToCenter = Math.sqrt(dx * dx + dy * dy);

        // When a card enters the processing center, accelerate conversion.
        if (distToCenter < processingCenter.width / 4) {
          if (card.type === 'fhir') {
            card.transformProgress += 0.05;
            if (card.transformProgress >= 1) {
              card.transformProgress = 1;
              card.type = 'jsonl';
            }
          }
          card.vx = 0.5;
        } else {
          card.vx = 2;
        }
        card.x += card.vx;
        card.y += card.vy;
        if (card.x > clientWidth) {
          card.opacity = 0;
        }
        card.y += Math.sin(time * 2 + card.x * 0.01) * 0.3;
      });
    };

    // Main draw loop.
    const draw = () => {
      const clientWidth = canvas.clientWidth;
      const clientHeight = canvas.clientHeight;
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      // Compute stage card positions: centered and evenly spaced under the processing center.
      const cardW = 130;
      const cardH = 50;
      const gap = 20;
      const totalWidth = stages.length * cardW + (stages.length - 1) * gap;
      const startX = (clientWidth - totalWidth) / 2;
      const cardY = processingCenter.y + processingCenter.height / 2 + 20;

      const stageXPositions = stages.map((_, i) => startX + i * (cardW + gap));

      stages.forEach((stage, i) => {
        drawStageCard(stageXPositions[i], cardY, cardW, cardH, stage);
      });

      drawProcessingCenter();
      updateCards();
      cards.forEach(drawCard);
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
      style={{ background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)' }}
    />
  );
}
import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface Agent {
  x: number;
  y: number;
  radius: number;
  icon: string;
  name: string;
  type: string;
  active: boolean;
  pulsePhase: number;
  connections: number[];
  taskProgress: number;
}

interface CentralLLM {
  x: number;
  y: number;
  radius: number;
  energy: number;
  pulsePhase: number;
  connections: number[];
}

interface DataStream {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  type: 'task' | 'feedback';
  color: string;
}

interface HumanFeedback {
  x: number;
  y: number;
  feedback: string;
  progress: number;
  opacity: number;
}

export function IntelAgentsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let agents: Agent[] = [];
    let centralLLM: CentralLLM;
    let dataStreams: DataStream[] = [];
    let feedbacks: HumanFeedback[] = [];

    const colors = isDark ? {
      primary: 'rgba(0, 240, 255, 1)',
      glow: 'rgba(0, 240, 255, 0.3)',
      stream: 'rgba(0, 240, 255, 0.4)',
      node: 'rgba(0, 240, 255, 0.2)',
      text: 'rgba(255, 255, 255, 0.8)',
      feedback: 'rgba(0, 255, 128, 0.6)',
      human: 'rgba(255, 255, 255, 0.2)'
    } : {
      primary: 'rgba(0, 54, 73, 1)',
      glow: 'rgba(0, 54, 73, 0.3)',
      stream: 'rgba(0, 54, 73, 0.4)',
      node: 'rgba(0, 54, 73, 0.2)',
      text: 'rgba(0, 0, 0, 0.8)',
      feedback: 'rgba(0, 128, 64, 0.6)',
      human: 'rgba(0, 0, 0, 0.2)'
    };

    const agentTypes = [
      { icon: '🛡️', name: 'Prior Auth Agent', type: 'auth' },
      { icon: '📄', name: 'Claims Agent', type: 'claims' },
      { icon: '💊', name: 'Pharmacy Agent', type: 'pharmacy' },
      { icon: '🧪', name: 'Lab Agent', type: 'lab' },
      { icon: '🔬', name: 'Radiology Agent', type: 'radiology' },
      { icon: '💬', name: 'Communications Agent', type: 'comms' },
      { icon: '✍️', name: 'Scribe Agent', type: 'scribe' },
      { icon: '📅', name: 'Careplanning Agent', type: 'planning' }
    ];

    const handleResize = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      const width = canvas.clientWidth * ratio;
      const height = canvas.clientHeight * ratio;
      
      canvas.width = width;
      canvas.height = height;
      ctx.scale(ratio, ratio);

      // Initialize central LLM
      centralLLM = {
        x: width / 2,
        y: height / 2,
        radius: 40,
        energy: 1,
        pulsePhase: 0,
        connections: []
      };

      // Initialize agents in a circular pattern
      const radius = Math.min(width, height) * 0.35;
      agents = agentTypes.map((type, i) => {
        const angle = (i / agentTypes.length) * Math.PI * 2;
        return {
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          radius: 25,
          icon: type.icon,
          name: type.name,
          type: type.type,
          active: false,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
          taskProgress: 0
        };
      });
    };

    const drawCentralLLM = () => {
      const { x, y, radius, pulsePhase } = centralLLM;

      // Draw glow
      const gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
      gradient.addColorStop(0, colors.glow);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw core
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.node;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Draw pulse
      const pulseRadius = radius * (1.5 + Math.sin(pulsePhase) * 0.3);
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw neural network pattern
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const innerX = x + Math.cos(angle) * radius * 0.5;
        const innerY = y + Math.sin(angle) * radius * 0.5;
        const outerX = x + Math.cos(angle) * radius * 0.8;
        const outerY = y + Math.sin(angle) * radius * 0.8;
        
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw label
      ctx.font = 'bold 16px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.fillText('Core LLM', x, y + radius * 2.5);
    };

    const drawAgent = (agent: Agent) => {
      const { x, y, radius, icon, name, active, pulsePhase, taskProgress } = agent;

      // Draw connection to LLM
      ctx.beginPath();
      ctx.moveTo(centralLLM.x, centralLLM.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = colors.stream;
      ctx.lineWidth = active ? 2 : 1;
      ctx.stroke();

      // Draw agent background
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = active ? colors.glow : colors.node;
      ctx.fill();
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = active ? 2 : 1;
      ctx.stroke();

      // Draw pulse effect when active
      if (active) {
        const pulseRadius = radius * (1.2 + Math.sin(pulsePhase) * 0.2);
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw progress arc if task in progress
      if (taskProgress > 0) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2 * taskProgress);
        ctx.strokeStyle = colors.feedback;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw icon and label
      ctx.font = '20px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, x, y);

      ctx.font = '12px system-ui';
      ctx.fillText(name, x, y + radius * 1.8);
    };

    const drawDataStream = (stream: DataStream) => {
      const { startX, startY, endX, endY, progress, type } = stream;
      
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      const gradient = ctx.createLinearGradient(startX, startY, currentX, currentY);
      gradient.addColorStop(0, stream.color);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = type === 'feedback' ? 3 : 2;
      ctx.stroke();

      // Add particles
      const particleCount = 5;
      for (let i = 0; i < particleCount; i++) {
        const p = (progress + i / particleCount) % 1;
        const px = startX + (endX - startX) * p;
        const py = startY + (endY - startY) * p;
        
        ctx.beginPath();
        ctx.arc(px, py, type === 'feedback' ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = stream.color;
        ctx.fill();
      }
    };

    const drawHumanFeedback = (feedback: HumanFeedback) => {
      const { x, y, feedback: text, opacity } = feedback;
      
      ctx.save();
      ctx.globalAlpha = opacity;

      // Draw human silhouette
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = colors.human;
      ctx.fill();
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw feedback text
      ctx.font = '12px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y - 30);

      ctx.restore();
    };

    const updateScene = (time: number) => {
      // Update central LLM
      centralLLM.pulsePhase += 0.05;
      centralLLM.energy = 0.8 + Math.sin(time) * 0.2;

      // Update agents
      agents.forEach(agent => {
        agent.pulsePhase += 0.03;
        if (agent.active) {
          agent.taskProgress = Math.min(1, agent.taskProgress + 0.01);
          if (agent.taskProgress >= 1) {
            agent.active = false;
            agent.taskProgress = 0;
          }
        }
      });

      // Randomly activate agents
      if (Math.random() < 0.02) {
        const inactiveAgents = agents.filter(a => !a.active);
        if (inactiveAgents.length > 0) {
          const agent = inactiveAgents[Math.floor(Math.random() * inactiveAgents.length)];
          agent.active = true;
          
          // Create data stream from LLM to agent
          dataStreams.push({
            startX: centralLLM.x,
            startY: centralLLM.y,
            endX: agent.x,
            endY: agent.y,
            progress: 0,
            type: 'task',
            color: colors.stream
          });
        }
      }

      // Update data streams
      dataStreams = dataStreams.filter(stream => {
        stream.progress += 0.02;
        return stream.progress < 1;
      });

      // Generate human feedback
      if (Math.random() < 0.01) {
        const feedbackTexts = [
          "Great diagnosis!",
          "Faster response",
          "Perfect match",
          "Clear explanation"
        ];
        
        feedbacks.push({
          x: canvas.width * 0.9,
          y: canvas.height * 0.8,
          feedback: feedbackTexts[Math.floor(Math.random() * feedbackTexts.length)],
          progress: 0,
          opacity: 1
        });

        // Create feedback stream to LLM
        dataStreams.push({
          startX: canvas.width * 0.9,
          startY: canvas.height * 0.8,
          endX: centralLLM.x,
          endY: centralLLM.y,
          progress: 0,
          type: 'feedback',
          color: colors.feedback
        });
      }

      // Update feedbacks
      feedbacks = feedbacks.filter(feedback => {
        feedback.progress += 0.02;
        feedback.opacity = Math.max(0, 1 - feedback.progress);
        return feedback.opacity > 0;
      });
    };

    const draw = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all components
      agents.forEach(drawAgent);
      dataStreams.forEach(drawDataStream);
      drawCentralLLM();
      feedbacks.forEach(drawHumanFeedback);

      // Update scene
      updateScene(time);
      
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
      className="w-full h-[500px] rounded-lg"
      style={{
        background: isDark 
          ? 'radial-gradient(circle at center, rgba(0, 20, 30, 0.5), rgba(0, 0, 0, 0.2))'
          : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(0, 54, 73, 0.1))',
      }}
    />
  );
}
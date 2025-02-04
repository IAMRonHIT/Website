import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface Agent {
  x: number;
  y: number;
  radius: number;
  icon: string;
  name: string;
  readiness: number;
  knowledge: number;
  connections: number[];
  pulsePhase: number;
  validationProgress: number;
}

interface CentralNode {
  x: number;
  y: number;
  radius: number;
  energy: number;
  pulsePhase: number;
}

interface KnowledgeBeam {
  targetAgent: number;
  progress: number;
  intensity: number;
}

export function AgentDistillationAnimation() {
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
    let beams: KnowledgeBeam[] = [];
    let centralNode: CentralNode;

    const colors = isDark
      ? {
          primary: 'rgba(0, 240, 255, 1)',
          glow: 'rgba(0, 240, 255, 0.3)',
          beam: 'rgba(0, 240, 255, 0.4)',
          node: 'rgba(0, 240, 255, 0.2)',
          text: 'rgba(255, 255, 255, 0.8)',
          subtext: 'rgba(255, 255, 255, 0.6)',
          ready: 'rgba(0, 255, 128, 0.6)'
        }
      : {
          primary: 'rgba(0, 54, 73, 1)',
          glow: 'rgba(0, 54, 73, 0.3)',
          beam: 'rgba(0, 54, 73, 0.4)',
          node: 'rgba(0, 54, 73, 0.2)',
          text: 'rgba(0, 0, 0, 0.8)',
          subtext: 'rgba(0, 0, 0, 0.6)',
          ready: 'rgba(0, 128, 64, 0.6)'
        };

    const agentTypes = [
      { icon: '🛡️', name: 'Prior Auth Agent' },
      { icon: '📄', name: 'Claims Agent' },
      { icon: '💊', name: 'Pharmacy Agent' },
      { icon: '🧪', name: 'Lab Agent' },
      { icon: '🔬', name: 'Radiology Agent' },
      { icon: '💬', name: 'Communications Agent' },
      { icon: '✍️', name: 'Scribe Agent' },
      { icon: '📅', name: 'Careplanning Agent' }
    ];

    // Set canvas dimensions based on the client size and device pixel ratio.
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx.resetTransform(); // Reset previous transforms.
      ctx.scale(dpr, dpr);
      return { width: canvas.clientWidth, height: canvas.clientHeight };
    };

    // Initialize the scene: central node, agents (arranged in a circle), and clear beams.
    const initScene = () => {
      const { width, height } = setCanvasSize();

      centralNode = {
        x: width / 2,
        y: height / 2,
        radius: 30,
        energy: 1,
        pulsePhase: 0
      };

      const orbitRadius = Math.min(width, height) * 0.35;
      agents = agentTypes.map((type, i) => {
        const angle = (i / agentTypes.length) * Math.PI * 2;
        return {
          x: width / 2 + Math.cos(angle) * orbitRadius,
          y: height / 2 + Math.sin(angle) * orbitRadius,
          radius: 20,
          icon: type.icon,
          name: type.name,
          readiness: 0,
          knowledge: 0,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
          validationProgress: 0
        };
      });
      beams = [];
    };

    // Draw the central LLM node with a subtle glow and pulse.
    const drawCentralNode = () => {
      const { x, y, radius, pulsePhase } = centralNode;
      const gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
      gradient.addColorStop(0, colors.glow);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.node;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      const pulseRadius = radius * (1.5 + Math.sin(pulsePhase) * 0.3);
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 14px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.fillText('Core LLM', x, y + radius * 2.5);
    };

    // Draw each agent node along with its connecting line, icon, label, and progress indicators.
    const drawAgent = (agent: Agent) => {
      const { x, y, radius, icon, name, readiness, pulsePhase, validationProgress } = agent;
      // Draw line from central node.
      ctx.beginPath();
      ctx.moveTo(centralNode.x, centralNode.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = colors.beam;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw the agent circle.
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.node;
      ctx.fill();

      // Draw a subtle glow when the agent begins accumulating readiness.
      if (readiness > 0) {
        const readinessGradient = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 1.5);
        readinessGradient.addColorStop(0, colors.ready);
        readinessGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = readinessGradient;
        ctx.fill();
      }

      // Draw the agent's icon.
      ctx.font = '16px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, x, y);

      // Draw the agent's label.
      ctx.font = '12px system-ui';
      ctx.fillStyle = colors.subtext;
      ctx.fillText(name, x, y + radius * 1.8);

      // If the agent is in the process of validating, show a progress arc.
      if (validationProgress > 0 && validationProgress < 1) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2 * validationProgress);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // A slight pulse around the agent for dynamism.
      const pulseRadius = radius * (1.2 + Math.sin(pulsePhase) * 0.2);
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Draw a beam from the central node to a target agent with particles along its path.
    const drawBeam = (beam: KnowledgeBeam) => {
      const agent = agents[beam.targetAgent];
      if (!agent) return;

      const startX = centralNode.x;
      const startY = centralNode.y;
      const dx = agent.x - startX;
      const dy = agent.y - startY;
      const currentX = startX + dx * beam.progress;
      const currentY = startY + dy * beam.progress;

      const gradient = ctx.createLinearGradient(startX, startY, currentX, currentY);
      gradient.addColorStop(0, colors.beam);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3 * beam.intensity;
      ctx.stroke();

      // Add a few small particles to enhance the beam effect.
      const particleCount = 5;
      for (let i = 0; i < particleCount; i++) {
        const particleProgress = (beam.progress + i / particleCount) % 1;
        const px = startX + dx * particleProgress;
        const py = startY + dy * particleProgress;
        ctx.beginPath();
        ctx.arc(px, py, 2 * beam.intensity, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();
      }
    };

    // Update the state of the central node, agents, and beams based on time.
    const updateScene = (time: number) => {
      centralNode.pulsePhase += 0.05;
      centralNode.energy = 0.8 + Math.sin(time) * 0.2;

      agents.forEach((agent, i) => {
        agent.pulsePhase += 0.03;
        // Increase knowledge if an active beam is targeting this agent.
        const activeBeam = beams.find((beam) => beam.targetAgent === i);
        if (activeBeam) {
          agent.knowledge = Math.min(1, agent.knowledge + 0.01);
          if (agent.knowledge >= 0.9) {
            agent.validationProgress = Math.min(1, agent.validationProgress + 0.005);
          }
        }
        if (agent.validationProgress >= 1) {
          agent.readiness = Math.min(1, agent.readiness + 0.05);
        }
      });

      // Remove completed beams.
      beams = beams.filter((beam) => beam.progress < 1);
      // Create new beams if there are fewer than 3 and there are agents not yet ready.
      if (beams.length < 3) {
        const availableAgents = agents
          .map((agent, index) => ({ index, readiness: agent.readiness }))
          .filter((agent) => agent.readiness < 1);
        if (availableAgents.length > 0) {
          const targetAgent =
            availableAgents[Math.floor(Math.random() * availableAgents.length)].index;
          beams.push({
            targetAgent,
            progress: 0,
            intensity: 0.5 + Math.random() * 0.5
          });
        }
      }
      beams.forEach((beam) => (beam.progress += 0.01));
    };

    // Main render loop: clear, draw, update, and schedule the next frame.
    const render = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCentralNode();
      agents.forEach(drawAgent);
      beams.forEach(drawBeam);
      updateScene(time);
      animationFrameId = requestAnimationFrame(render);
    };

    initScene();
    window.addEventListener('resize', initScene);
    render();

    return () => {
      window.removeEventListener('resize', initScene);
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
          : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(0, 54, 73, 0.1))'
      }}
    />
  );
}

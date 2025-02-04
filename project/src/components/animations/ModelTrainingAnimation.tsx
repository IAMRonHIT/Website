import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface NeuralNode {
  x: number;
  y: number;
  radius: number;
  connections: number[];
  activation: number;
  layer: number;
  knowledge: number;
  pulsePhase: number;
}

interface DataPoint {
  x: number;
  y: number;
  content: string;
  progress: number;
  absorbed: boolean;
}

export function ModelTrainingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: NeuralNode[] = [];
    let dataPoints: DataPoint[] = [];
    let trainingPhase = 0;
    const layerCount = 5;
    const nodesPerLayer = [4, 6, 8, 6, 4];
    const phaseNames = [
      'Model Initialization',
      'Data Integration',
      'Knowledge Synthesis',
      'Model Validation',
      'Deployment Ready'
    ];
    
    const colors = isDark ? {
      node: 'rgba(0, 240, 255, 0.2)',
      connection: 'rgba(0, 240, 255, 0.1)',
      pulse: 'rgba(0, 240, 255, 0.4)',
      text: 'rgba(255, 255, 255, 0.8)',
      data: 'rgba(0, 240, 255, 0.6)'
    } : {
      node: 'rgba(0, 54, 73, 0.2)',
      connection: 'rgba(0, 54, 73, 0.1)',
      pulse: 'rgba(0, 54, 73, 0.4)',
      text: 'rgba(0, 0, 0, 0.8)',
      data: 'rgba(0, 54, 73, 0.6)'
    };

    const handleResize = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      const width = canvas.clientWidth * ratio;
      const height = canvas.clientHeight * ratio;
      
      canvas.width = width;
      canvas.height = height;
      ctx.scale(ratio, ratio);

      // Initialize neural network
      nodes = [];
      let nodeIndex = 0;
      
      for (let layer = 0; layer < layerCount; layer++) {
        const nodeCount = nodesPerLayer[layer];
        const layerWidth = width * 0.6;
        const startX = width * 0.2 + (layerWidth * layer) / (layerCount - 1);
        
        for (let i = 0; i < nodeCount; i++) {
          const spacing = height * 0.6 / (nodeCount - 1);
          const y = height * 0.2 + spacing * i;
          
          nodes.push({
            x: startX,
            y,
            radius: 4,
            connections: [],
            activation: 0,
            layer,
            knowledge: 0,
            pulsePhase: Math.random() * Math.PI * 2
          });

          // Connect to next layer
          if (layer < layerCount - 1) {
            const nextLayerStart = nodeIndex + nodeCount;
            const nextLayerCount = nodesPerLayer[layer + 1];
            for (let j = 0; j < nextLayerCount; j++) {
              nodes[nodeIndex].connections.push(nextLayerStart + j);
            }
          }
          nodeIndex++;
        }
      }
    };

    const createDataPoint = () => {
      const examples = [
        "Patient History",
        "Treatment Plans",
        "Clinical Notes",
        "Lab Results",
        "Medications"
      ];
      
      return {
        x: 0,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        content: examples[Math.floor(Math.random() * examples.length)],
        progress: 0,
        absorbed: false
      };
    };

    const drawNode = (node: NeuralNode) => {
      // Base node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * (1 + node.knowledge * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = colors.node;
      ctx.fill();

      // Knowledge indicator
      const glowRadius = node.radius * (2 + node.knowledge * 1.5);
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.pulse;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Activation pulse
      const pulseRadius = node.radius * (3 + Math.sin(node.pulsePhase) * 2);
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.pulse;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawConnection = (from: NeuralNode, to: NeuralNode) => {
      if (!from || !to) return;
      
      const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      gradient.addColorStop(0, colors.connection);
      gradient.addColorStop(1, colors.connection);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.5 + (from.knowledge + to.knowledge) * 0.5;
      ctx.stroke();
    };

    const drawDataPoint = (point: DataPoint) => {
      ctx.save();
      ctx.translate(point.x, point.y);
      
      // Draw data point
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors.data;
      ctx.fill();

      // Draw label
      ctx.font = '12px system-ui';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'right';
      ctx.fillText(point.content, -10, 4);

      ctx.restore();
    };

    const updateNetwork = (time: number) => {
      // Update phase
      if (time % 5 < 0.016) {
        trainingPhase = (trainingPhase + 1) % phaseNames.length;
      }

      // Update nodes
      nodes.forEach(node => {
        node.pulsePhase += 0.05;
        
        // Increase knowledge based on phase
        if (node.layer <= trainingPhase) {
          node.knowledge = Math.min(1, node.knowledge + 0.01);
          node.activation = 0.5 + Math.sin(time + node.x * 0.01) * 0.5;
        }
      });

      // Create new data points
      if (trainingPhase === 1 && Math.random() < 0.05) {
        dataPoints.push(createDataPoint());
      }

      // Update data points
      dataPoints = dataPoints.filter(point => !point.absorbed);
      dataPoints.forEach(point => {
        if (!point.absorbed) {
          point.x += 2;
          point.progress += 0.01;
          
          // Check for absorption by first layer
          const firstLayerNodes = nodes.filter(n => n.layer === 0);
          firstLayerNodes.forEach(node => {
            const dx = node.x - point.x;
            const dy = node.y - point.y;
            if (Math.sqrt(dx * dx + dy * dy) < node.radius * 3) {
              point.absorbed = true;
              node.knowledge = Math.min(1, node.knowledge + 0.1);
            }
          });
        }
      });
    };

    const draw = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(targetIndex => {
          if (targetIndex >= nodes.length) return;
          drawConnection(node, nodes[targetIndex]);
        });
      });

      // Draw nodes
      nodes.forEach(drawNode);

      // Draw data points
      dataPoints.forEach(drawDataPoint);

      // Draw phase label
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = colors.text;
      ctx.fillText(phaseNames[trainingPhase], canvas.width / 2, canvas.height - 20);

      // Draw progress indicators
      const indicatorWidth = 40;
      const indicatorSpacing = 10;
      const totalWidth = (indicatorWidth + indicatorSpacing) * phaseNames.length;
      const startX = (canvas.width - totalWidth) / 2;
      
      phaseNames.forEach((_, i) => {
        const x = startX + i * (indicatorWidth + indicatorSpacing);
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - 50, indicatorWidth, 4, 2);
        ctx.fillStyle = i <= trainingPhase ? colors.pulse : colors.connection;
        ctx.fill();
      });

      updateNetwork(time);
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
      className="w-full h-[400px] rounded-lg"
      style={{
        background: isDark 
          ? 'radial-gradient(circle at center, rgba(0, 20, 30, 0.5), rgba(0, 0, 0, 0.2))'
          : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(0, 54, 73, 0.1))',
      }}
    />
  );
}
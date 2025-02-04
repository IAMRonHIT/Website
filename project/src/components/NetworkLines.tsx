import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
}

export function NetworkLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const nodeCount = 30;
    const maxConnections = 3;
    const maxDistance = 200;
    const particleSpeed = 0.5;
    
    const handleResize = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(ratio, ratio);

      // Initialize nodes
      nodes = Array.from({ length: nodeCount }, () => {
        const radius = 2 + Math.random() * 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
          radius,
          connections: []
        };
      });

      // Create initial connections
      nodes.forEach((node, i) => {
        const distances = nodes
          .map((otherNode, j) => ({
            index: j,
            distance: Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          }))
          .filter(({ index, distance }) => index !== i && distance < maxDistance)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxConnections);

        node.connections = distances.map(d => d.index);
      });
    };

    const updateNodes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Update connections based on proximity
        const distances = nodes
          .map((otherNode, j) => ({
            index: j,
            distance: Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          }))
          .filter(({ index, distance }) => 
            index !== nodes.indexOf(node) && distance < maxDistance
          )
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxConnections);

        node.connections = distances.map(d => d.index);
      });
    };

    const drawNodes = () => {
      const time = Date.now() * 0.001; // For animation timing

      nodes.forEach(node => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 54, 73, 0.3)';
        ctx.fill();

        // Draw pulsing effect
        const pulseSize = Math.sin(time * 2) * 0.5 + 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 54, 73, 0.1)';
        ctx.stroke();

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes[connectionIndex];
          const distance = Math.hypot(
            node.x - connectedNode.x,
            node.y - connectedNode.y
          );
          const opacity = 1 - (distance / maxDistance);

          // Draw line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.strokeStyle = isDark 
            ? `rgba(0, 240, 255, ${opacity * 0.3})`
            : `rgba(0, 54, 73, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw moving particles along connections
          const particleCount = 2;
          for (let i = 0; i < particleCount; i++) {
            const progress = ((time * (0.5 + i * 0.2)) % 1);
            const particleX = node.x + (connectedNode.x - node.x) * progress;
            const particleY = node.y + (connectedNode.y - node.y) * progress;

            ctx.beginPath();
            ctx.arc(particleX, particleY, 1, 0, Math.PI * 2);
            ctx.fillStyle = isDark 
              ? `rgba(0, 240, 255, ${opacity * 0.8})`
              : `rgba(0, 54, 73, ${opacity * 0.5})`;
            ctx.fill();
          }
        });
      });
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      
      updateNodes();
      drawNodes();
      
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        opacity: isDark ? 0.7 : 0.15,
        pointerEvents: 'none',
      }}
    />
  );
}
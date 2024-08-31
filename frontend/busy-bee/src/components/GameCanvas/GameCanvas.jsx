import React, { useRef, useEffect, useState, useCallback } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    bee: { x: 0, y: 0 },
    camera: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
  });
  const [, forceUpdate] = useState({});

  const hexSize = 30;
  const hexHeight = hexSize * 2;
  const hexWidth = Math.sqrt(3) / 2 * hexHeight;

  const hexToPixel = useCallback((hex) => {
    const x = hexSize * (Math.sqrt(3) * hex.q + Math.sqrt(3) / 2 * hex.r);
    const y = hexSize * (3 / 2 * hex.r);
    return { x, y };
  }, []);

  const nearestHex = useCallback((x, y) => {
    const q = (Math.sqrt(3) / 3 * x - 1 / 3 * y) / hexSize;
    const r = (2 / 3 * y) / hexSize;
    return { q: Math.round(q), r: Math.round(r) };
  }, []);

  const drawHexagon = useCallback((ctx, x, y) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI / 6 * i;
      const hx = x + hexSize * Math.cos(angle);
      const hy = y + hexSize * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }, []);

  const drawBee = useCallback((ctx, x, y) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameStateRef.current.bee = { x: canvas.width / 2, y: canvas.height / 2 };
      forceUpdate({});
    };

    const generateHexGrid = () => {
      const cols = Math.ceil(canvas.width / hexWidth) + 1;
      const rows = Math.ceil(canvas.height / hexHeight) + 1;
      const hexGrid = [];

      for (let q = -cols; q < cols; q++) {
        for (let r = -rows; r < rows; r++) {
          hexGrid.push({ q, r });
        }
      }

      return hexGrid;
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hexGrid = generateHexGrid();
      const state = gameStateRef.current;

      // Calculate the target position in world coordinates
      const targetWorldX = state.cursor.x + state.camera.x;
      const targetWorldY = state.cursor.y + state.camera.y;

      // Find the nearest hex to the target position
      const targetHex = nearestHex(targetWorldX, targetWorldY);
      const targetPixel = hexToPixel(targetHex);

      // Move bee towards the target
      const dx = targetPixel.x - state.bee.x;
      const dy = targetPixel.y - state.bee.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 5; // Adjust this value to change the bee's speed

      if (distance > speed) {
        state.bee.x += (dx / distance) * speed;
        state.bee.y += (dy / distance) * speed;
      } else {
        state.bee.x = targetPixel.x;
        state.bee.y = targetPixel.y;
      }

      // Update camera to center on bee
      state.camera.x = state.bee.x - canvas.width / 2;
      state.camera.y = state.bee.y - canvas.height / 2;

      // Draw hex grid
      ctx.strokeStyle = '#ccc';
      hexGrid.forEach(hex => {
        const pixel = hexToPixel(hex);
        drawHexagon(
          ctx,
          pixel.x - state.camera.x,
          pixel.y - state.camera.y
        );
      });

      // Draw bee
      drawBee(ctx, state.bee.x - state.camera.x, state.bee.y - state.camera.y);

      animationFrameId = window.requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawBee, drawHexagon, hexToPixel, nearestHex]);

  const handleMouseMove = useCallback((e) => {
    gameStateRef.current.cursor = { x: e.clientX, y: e.clientY };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      style={{ display: 'block' }}
    />
  );
};

export default GameCanvas;
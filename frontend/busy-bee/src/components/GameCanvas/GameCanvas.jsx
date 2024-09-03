import React, { useRef, useEffect, useCallback } from 'react';
import { drawBee, drawHexagon } from './drawUtils';
import { generateHexGrid, hexToPixel, nearestHex } from './hexUtils';
import { useGameState } from './gameState';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { gameStateRef, updateGameState } = useGameState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateGameState('resize', { width: canvas.width, height: canvas.height });
    };

    const gameLoop = () => {
      const state = gameStateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hexGrid = generateHexGrid(canvas.width, canvas.height, state.hexSize);

      // Find the nearest hex to the target position
      const targetHex = nearestHex(state.cursor.x + state.camera.x, state.cursor.y + state.camera.y, state.hexSize);
      updateGameState('moveBee', { targetHex });

      // Draw hex grid
      ctx.strokeStyle = '#ccc';
      hexGrid.forEach(hex => {
        const pixel = hexToPixel(hex, state.hexSize);
        drawHexagon(ctx, pixel.x - state.camera.x, pixel.y - state.camera.y, state.hexSize);
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
  }, [drawBee, drawHexagon, hexToPixel, nearestHex, updateGameState]);

  const handleMouseMove = useCallback((e) => {
    updateGameState('moveCursor', { x: e.clientX, y: e.clientY });
  }, [updateGameState]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      style={{ display: 'block' }}
    />
  );
};

export default GameCanvas;

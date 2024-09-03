import { useRef, useCallback } from 'react';
import { hexToPixel } from './hexUtils.js';

export const useGameState = () => {
  const gameStateRef = useRef({
    bee: { x: 0, y: 0 },
    camera: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
    hexSize: 30,
  });

  const updateGameState = useCallback((action, payload) => {
    const state = gameStateRef.current;

    switch (action) {
      case 'resize': {
        state.bee = { x: payload.width / 2, y: payload.height / 2 };
        break;
      }
      case 'moveCursor': {
        state.cursor = payload;
        break;
      }
      case 'moveBee': {
        const targetPixel = hexToPixel(payload.targetHex, state.hexSize);
        const dx = targetPixel.x - state.bee.x;
        const dy = targetPixel.y - state.bee.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 5;
    
        if (distance > speed) {
          state.bee.x += (dx / distance) * speed;
          state.bee.y += (dy / distance) * speed;
        } else {
          state.bee.x = targetPixel.x;
          state.bee.y = targetPixel.y;
        }
    
        state.camera.x = state.bee.x - window.innerWidth / 2;
        state.camera.y = state.bee.y - window.innerHeight / 2;
        break;
      }
      default:
        break;
    }
    
  }, []);

  return { gameStateRef, updateGameState };
};

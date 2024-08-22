import React, { useState, useEffect } from 'react';
import './HexGrid.css';
import Hex from './Hex.jsx';

function HexGrid() {
  const [beePosition, setBeePosition] = useState({ q: 0, r: 0, s: 0 });
  const [targetHex, setTargetHex] = useState({ q: 0, r: 0, s: 0 });
  const [radius, setRadius] = useState(3);

  useEffect(() => {
    // Dynamically calculate the radius based on the viewport size
    const size = 50;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const hexWidth = size * 2 * Math.sqrt(3) / 2;
    const hexHeight = size * 1.5;

    const calculatedRadius = Math.max(
      Math.ceil(width / hexWidth),
      Math.ceil(height / hexHeight)
    );

    setRadius(calculatedRadius + 2);
  }, []);

  useEffect(() => {
    const moveBee = () => {
      if (targetHex.q !== beePosition.q || targetHex.r !== beePosition.r || targetHex.s !== beePosition.s) {
        const newPath = calculatePath(beePosition, targetHex);
        if (newPath.length > 0) {
          setBeePosition(newPath[0]);
        }
      }
    };

    const interval = setInterval(moveBee, 100);
    return () => clearInterval(interval);
  }, [targetHex, beePosition]);

  const handleHexHover = (q, r, s) => {
    setTargetHex({ q, r, s });
  };

  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const s = -q - r;
      hexes.push(
        <Hex
          key={`${q},${r},${s}`}
          q={q}
          r={r}
          s={s}
          content={`${q},${r},${s}`}
          isBeeHere={beePosition.q === q && beePosition.r === r && beePosition.s === s}
          onMouseEnter={handleHexHover}
        />
      );
    }
  }

  return <div className="hex-grid">{hexes}</div>;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function cubeLerp(a, b, t) {
  return {
    q: lerp(a.q, b.q, t),
    r: lerp(a.r, b.r, t),
    s: lerp(a.s, b.s, t),
  };
}

function cubeRound(cube) {
  let q = Math.round(cube.q);
  let r = Math.round(cube.r);
  let s = Math.round(cube.s);

  const q_diff = Math.abs(q - cube.q);
  const r_diff = Math.abs(r - cube.r);
  const s_diff = Math.abs(s - cube.s);

  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

function calculatePath(start, target) {
  const N = Math.max(
    Math.abs(target.q - start.q),
    Math.abs(target.r - start.r),
    Math.abs(target.s - start.s)
  );

  const path = [];
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const interpolated = cubeLerp(start, target, t);
    path.push(cubeRound(interpolated));
  }

  return path;
}

export default HexGrid;

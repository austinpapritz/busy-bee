import React, { useState, useEffect } from 'react';
import './HexGrid.css';
import Hex from './Hex.jsx';
import PropTypes from 'prop-types';

function HexGrid({ radius }) {
  const [beePosition, setBeePosition] = useState({ q: 0, r: 0, s: 0 });
  const [path, setPath] = useState([]);

  const handleHexClick = (q, r, s) => {
    const target = { q, r, s };
    const newPath = calculatePath(beePosition, target);
    setPath(newPath);
  };

  useEffect(() => {
    if (path.length > 0) {
      const interval = setInterval(() => {
        setBeePosition(path[0]);
        setPath(path.slice(1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [path]);

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
          onClick={() => handleHexClick(q, r, s)}
        />
      );
    }
  }

  return <div className="hex-grid">{hexes}</div>;
}

function calculatePath(start, target) {
  // Simple straight-line path calculation for now
  const { q: q1, r: r1, s: s1 } = start;
  const { q: q2, r: r2, s: s2 } = target;
  
  const path = [];
  let current = { q: q1, r: r1, s: s1 };

  while (current.q !== q2 || current.r !== r2 || current.s !== s2) {
    const step = {
      q: current.q + Math.sign(q2 - current.q),
      r: current.r + Math.sign(r2 - current.r),
      s: current.s + Math.sign(s2 - current.s),
    };
    path.push(step);
    current = step;
  }

  return path;
}

// PropTypes validation
HexGrid.propTypes = {
  radius: PropTypes.number
};

export default HexGrid;

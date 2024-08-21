import React, { useState } from 'react';
import './HexGrid.css';
import Hex from './Hex.jsx';
import PropTypes from 'prop-types';

function HexGrid({ radius }) {
  const [beePosition, setBeePosition] = useState({ q: 0, r: 0, s: 0 });

  const handleHexClick = (q, r, s) => {
    setBeePosition({ q, r, s });
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
          onClick={() => handleHexClick(q, r, s)}
        />
      );
    }
  }

  return <div className="hex-grid">{hexes}</div>;
}

// PropTypes validation
HexGrid.propTypes = {
  radius: PropTypes.number
};

export default HexGrid;

import React from 'react';
import './HexGrid.css';
import PropTypes from 'prop-types';

function Hex({ q, r, s, content }) {
  const size = 50; // half the width of the hexagon
  const width = size * 2;
  const height = Math.sqrt(3) * size;

  const x = size * (3 / 2) * q;
  const y = height * (r + q / 2);

  const clipPath = generateRandomHexPolygon();

  return (
    <div
      className="hex"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
        clipPath: clipPath,
      }}
    >
      {content}
    </div>
  );
}

function generateRandomHexPolygon() {
  const basePoints = [
    [25, 2],  // top-left
    [75, 2],  // top-right
    [98, 50], // middle-right
    [75, 98], // bottom-right
    [25, 98], // bottom-left
    [2, 50],  // middle-left
  ];

  const variation = 2; // percentage variation

  const randomize = (value) => {
    const offset = Math.random() * variation * 2 - variation; // generates a number between -2 and +2
    return value + offset;
  };

  const points = basePoints
    .map(([x, y]) => `${randomize(x)}% ${randomize(y)}%`)
    .join(", ");

  return `polygon(${points})`;
}

// PropTypes validation
Hex.propTypes = {
  q: PropTypes.number
};

Hex.propTypes = {
  r: PropTypes.number
};

Hex.propTypes = {
  s: PropTypes.number
};

Hex.propTypes = {
  content: PropTypes.string
};

export default Hex;

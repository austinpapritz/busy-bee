import React from 'react';
import './HexGrid.css';
import PropTypes from 'prop-types';

function Hex({ q, r, s, content, isBeeHere, onClick }) {
  const size = 50;
  const width = size * 2;
  const height = Math.sqrt(3) * size;

  const x = size * (3 / 2) * q;
  const y = height * (r + q / 2);

  const beeStyle = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: 'yellow',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      className="hex"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
      {isBeeHere && <div style={beeStyle} />}
      {content}
    </div>
  );
}

// PropTypes validation
Hex.propTypes = {
  q: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  s: PropTypes.number.isRequired,
  content: PropTypes.string,
  isBeeHere: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Hex;

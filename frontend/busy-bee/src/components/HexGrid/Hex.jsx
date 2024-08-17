import './HexGrid.css';
import PropTypes from 'prop-types';

function Hex({ q, r, content }) {
  const size = 50;
  const width = size * 2;
  const height = Math.sqrt(3) * size;
  
  const x = size * (3 / 2) * q;
  const y = height * (r + q / 2);
  
  return (
    <div
      className="hex"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {content}
    </div>
  );
}

// PropTypes validation
Hex.propTypes = {
  q: PropTypes.number
};

Hex.propTypes = {
  r: PropTypes.number
};

Hex.propTypes = {
  content: PropTypes.string
};

export default Hex;

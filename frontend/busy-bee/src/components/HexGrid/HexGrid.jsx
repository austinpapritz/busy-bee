import Hex from './Hex.jsx';
import './HexGrid.css';

function HexGrid({ radius }) {
  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const s = -q - r;
      hexes.push(<Hex key={`${q},${r},${s}`} q={q} r={r} s={s} content={`${q},${r},${s}`} />);
    }
  }

  return <div className="hex-grid">{hexes}</div>;
}

export default HexGrid;

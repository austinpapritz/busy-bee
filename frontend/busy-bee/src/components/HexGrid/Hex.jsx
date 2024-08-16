import './HexGrid.css';

function Hex({ q, r, s, content }) {
  const size = 50; // half the width of the hexagon
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

export default Hex;

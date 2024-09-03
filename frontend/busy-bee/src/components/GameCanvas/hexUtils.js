export const hexToPixel = (hex, hexSize) => {
  const x = hexSize * (Math.sqrt(3) * hex.q + Math.sqrt(3) / 2 * hex.r);
  const y = hexSize * (3 / 2 * hex.r);
  return { x, y };
};

export const nearestHex = (x, y, hexSize) => {
  const q = (Math.sqrt(3) / 3 * x - 1 / 3 * y) / hexSize;
  const r = (2 / 3 * y) / hexSize;
  return { q: Math.round(q), r: Math.round(r) };
};

export const generateHexGrid = (width, height, hexSize) => {
  const cols = Math.ceil(width / (Math.sqrt(3) * hexSize)) + 1;
  const rows = Math.ceil(height / (1.5 * hexSize)) + 1;
  const hexGrid = [];

  for (let q = -cols; q < cols; q++) {
    for (let r = -rows; r < rows; r++) {
      q = q + 0.08;
      r = r + 0.8;
      hexGrid.push({ q, r });
    }
  }

  return hexGrid;
};

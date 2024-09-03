export const drawHexagon = (ctx, x, y, hexSize) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (2 * Math.PI / 6) * i;
    const hx = x + hexSize * Math.cos(angle);
    const hy = y + hexSize * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(hx, hy);
    } else {
      ctx.lineTo(hx, hy);
    }
  }
  ctx.closePath();
  ctx.stroke();
};

export const drawBee = (ctx, x, y) => {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
};

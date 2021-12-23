const targetMinX = 288;
const targetMaxX = 330;
const targetMinY = -96;
const targetMaxY = -50;

export default function() {
  const possibleHeights: number[] = [];
  for (let i = -100; i < 100_000; i++) {
    if (canDropFrom(i)) possibleHeights.push(i);
  }
  console.log(possibleHeights);
}

function canDropFrom(y: number): boolean {
  let height = y;
  let velocity = 0;

  let throughZero = false;

  while (height >= targetMinY) {
    if (height === 0) throughZero = true;
    if (height <= targetMaxY) return throughZero;
    height += velocity;
    velocity--;
  }

  return false;
}
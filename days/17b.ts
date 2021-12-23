const targetMinX = 288;
const targetMaxX = 330;
const targetMinY = -96;
const targetMaxY = -50;

// const targetMinX = 20;
// const targetMaxX = 30;
// const targetMinY = -10;
// const targetMaxY = -5;

export default function() {
  const possibleHeights: number[] = [];
  for (let i = -100; i < 5000; i++) {
    if (canDropFrom(i)) possibleHeights.push(i);
  }

  const possibleXVelocity: number[] = [];
  for (let i = 0; i < 1000; i++) {
    if (canFireX(i)) possibleXVelocity.push(i);
  }

  const possibleYVelocity = possibleHeights.map(height => yVelocityForHeight(height));
  for (let i = targetMinY; i < 0; i++) {
    // add all the Y velocities where you shoot it down rather than it being a parabolic arc
    possibleYVelocity.push(i);
  }

  const possibleConfigs = possibleXVelocity.flatMap(x => possibleYVelocity.map(y => ({x,y})));
  const validConfigs = possibleConfigs.filter(config => isConfigValid(config));

  console.log(validConfigs.length);
}

function canFireX(xVelocity: number): boolean {
  let x = 0;
  let velocity = xVelocity;

  while (x <= targetMaxX) {
    x += velocity;

    if (x >= targetMinX) return true;
    if (velocity < 0) return false;

    velocity--;
  }

  return false;
}

function canDropFrom(y: number): boolean {
  let height = y;
  let velocity = 0;

  let throughZero = false;

  while (height >= targetMinY) {
    height += velocity;

    if (height === 0) throughZero = true;
    if (height <= targetMaxY) return throughZero;

    velocity--;
  }

  return false;
}

function yVelocityForHeight(y: number): number {
  let height = y;
  let velocity = 0;

  while (height >= 0) {
    height += velocity;

    if (height === 0) {
      if (velocity === 0) return 0;
      else return -velocity;
    }

    velocity--;
  }

  throw new Error("Invalid height");
}

function isConfigValid(config: {x: number, y: number}): boolean {
  let xVelocity = config.x;
  let yVelocity = config.y;

  let x = 0;
  let y = 0;

  while (true) {
    if (x >= targetMinX && x <= targetMaxX && y >= targetMinY && y <= targetMaxY) return true;
    if (x > targetMaxX) return false;
    if (y < targetMinY) return false;

    x += xVelocity;
    y += yVelocity;

    xVelocity = Math.max(0, xVelocity - 1);
    yVelocity--;
  }
}
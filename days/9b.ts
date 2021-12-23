import input from "./9input";

// const input = `
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// `;

export default function() {
  const parsedInput: number[][] = input.trim().split("\n").map(line => line.split("").map(char => parseInt(char)));

  const lowPoints: {x: number; y: number}[] = [];

  for (let y = 0; y < parsedInput.length; y++) {
    const row = parsedInput[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      const up: number | undefined = parsedInput[y - 1]?.[x];
      const right: number | undefined = parsedInput[y]?.[x + 1];
      const down: number | undefined = parsedInput[y + 1]?.[x];
      const left: number | undefined = parsedInput[y]?.[x - 1];

      if (up === undefined || cell < up) {
        if (right === undefined || cell < right) {
          if (down === undefined || cell < down) {
            if (left === undefined || cell < left) {
              lowPoints.push({x,y});
            }
          }
        }
      }
    }
  }

  const basins: number[] = lowPoints.map(coord => floodFill(parsedInput, coord));
  basins.sort((a,b) => b-a);
  console.log(basins[0] * basins[1] * basins[2]);
}

function floodFill(parsedInput: number[][], lowPoint: {x: number; y: number}): number {
  const seenCoords: Set<string> = new Set();

  let toProcessCoords: Set<string> = new Set();
  let newCoords: Set<string> = new Set([JSON.stringify(lowPoint)]);

  while (newCoords.size > 0) {
    toProcessCoords = newCoords;
    newCoords = new Set();

    toProcessCoords.forEach(coordStr => {
      const {x, y}: {x: number; y: number;} = JSON.parse(coordStr);
      const value = parsedInput[y][x];

      seenCoords.add(coordStr);

      processCoord(value, x, y-1, parsedInput, seenCoords, toProcessCoords, newCoords);
      processCoord(value, x, y+1, parsedInput, seenCoords, toProcessCoords, newCoords);
      processCoord(value, x-1, y, parsedInput, seenCoords, toProcessCoords, newCoords);
      processCoord(value, x+1, y, parsedInput, seenCoords, toProcessCoords, newCoords);
    })
  }

  return seenCoords.size;
}

function processCoord(parentValue: number, x: number, y: number, parsedInput: number[][], seenCoords: Set<string>, toProcessCoords: Set<string>, newCoords: Set<string>) {
  const coord = {x, y};
  const coordStr = JSON.stringify(coord);
  const value: number | undefined = parsedInput[coord.y]?.[coord.x];

  if (value === undefined) return;
  if (value === 9) return;
  if (value < parentValue) return;
  if (seenCoords.has(coordStr)) return;
  if (toProcessCoords.has(coordStr)) return;
  newCoords.add(coordStr);
}

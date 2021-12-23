import input from "./5input";

// const input = `
// 0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2
// `;

type Coord = [number, number];
type Line = [Coord, Coord];

export default function () {
  const lines: Line[] = input
    .trim()
    .split("\n")
    .map(line => 
      line
        .split(" -> ")
        .map(coordString => 
          coordString
            .split(",")
            .map(coordPart => parseInt(coordPart)) as Coord
        ) as Line
    );

  const field: Record<string, number> = {};

  lines.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      // Horizontal
      const yMin = Math.min(y1, y2);
      const yMax = Math.max(y1, y2);
      for (let y = yMin; y <= yMax; y++) {
        const x = x1;
        field[`${x},${y}`] = (field[`${x},${y}`] ?? 0) + 1;
      }
    } else if (y1 === y2) {
      // Vertical
      const xMin = Math.min(x1, x2);
      const xMax = Math.max(x1, x2);
      for (let x = xMin; x <= xMax; x++) {
        const y = y1;
        field[`${x},${y}`] = (field[`${x},${y}`] ?? 0) + 1;
      }
    } else {
      // Diagonal
      const xDelta = x2 - x1;
      const xInc = xDelta / Math.abs(xDelta);

      const yDelta = y2 - y1;
      const yInc = yDelta / Math.abs(yDelta);

      const count = Math.abs(yDelta);

      for (let i = 0; i <= count; i++) {
        const x = x1 + xInc * i;
        const y = y1 + yInc * i;
        field[`${x},${y}`] = (field[`${x},${y}`] ?? 0) + 1;
      }
    }
  })

  const output = Object.values(field).filter(count => count >= 2).length;
  console.log(output);

//   for (let y = 0; y < 10; y++) {
//     let text = "";
//     for (let x = 0; x < 10; x++) {
//       text += field[`${x},${y}`] ?? ".";
//     }
//     console.log(text);
//   }
}
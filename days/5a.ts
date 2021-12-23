import input from "./5input";

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
    }
  })

  const output = Object.values(field).filter(count => count >= 2).length;
  console.log(output);
}
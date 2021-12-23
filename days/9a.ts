import input from "./9input";

export default function() {
  const parsedInput: number[][] = input.trim().split("\n").map(line => line.split("").map(char => parseInt(char)));

  const dangerCells: number[] = [];

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
              dangerCells.push(cell);
            }
          }
        }
      }
    }
  }

  const riskScores = dangerCells.map(danger => danger + 1);
  const output = riskScores.reduce((a,b)=>a+b);
  console.log(output);
}
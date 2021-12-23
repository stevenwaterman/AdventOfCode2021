import input from "./3input";

export default function() {
  const parsedInput = input.trim().split("\n").map(line => line.trim());

  const colSums: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 12; i++) {
    parsedInput.forEach(line => {
      const newValue = line[i];
      if (newValue === "0") {
        colSums[i]--;
      } else {
        colSums[i]++;
      }
    })
  }

  const gammaCols = colSums.map(val => val > 0 ? 1 : 0);
  const epsilonCols = colSums.map(val => val < 0 ? 1 : 0);

  const gamma = gammaCols.reduce((acc, elem, idx) => acc + (elem * Math.pow(2, 11 - idx)), 0);
  const epsilon = epsilonCols.reduce((acc, elem, idx) => acc + (elem * Math.pow(2, 11 - idx)), 0);
  console.log(gamma * epsilon)
}
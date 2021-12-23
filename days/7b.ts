import input from "./7input";

// const input = `16,1,2,0,4,2,7,1,2,14`;

function getFuelCost(from: number, to: number): number {
  const delta = Math.abs(from - to);
  const fuelCost = (delta * (delta + 1)) / 2;
  return fuelCost;
}


export default function() {
  const parsedInput = input.trim().split(",").map(str => parseInt(str));

  const options: number[] = [];
  for (let target = 0; target < Math.max(...parsedInput); target++) {
    const fuelCosts = parsedInput.map(num => getFuelCost(num, target));
    const totalFuel = fuelCosts.reduce((a,b) => a + b, 0);
    options.push(totalFuel);
  }

  console.log(Math.min(...options));
}
import input from "./7input";

// const input = `16,1,2,0,4,2,7,1,2,14`;

export default function() {
  const parsedInput = input.trim().split(",").map(str => parseInt(str));

  // const sum = parsedInput.reduce((a,b) => a + b, 0);
  // const avg = sum / (parsedInput.length);
  // const target = Math.round(avg);

  const options: number[] = [];
  for (let i = 0; i < Math.max(...parsedInput); i++) {
    const fuelCosts = parsedInput.map(num => Math.abs(num - i));
    const totalFuel = fuelCosts.reduce((a,b) => a + b, 0);
    options.push(totalFuel);
  }

  console.log(Math.min(...options));
}
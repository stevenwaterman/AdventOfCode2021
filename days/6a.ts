import input from "./6input";

export default function() {
  let fish: number[] = input.trim().split(",").map(str => parseInt(str));
  for (let day = 0; day < 80; day++) {
    fish = simulate(fish);
  }

  console.log(fish.length);
}

function simulate(fish: number[]): number[] {
  const newFish = [];
  fish.forEach(num => {
    const newNum = num - 1;
    if (newNum < 0) {
      newFish.push(6, 8);
    } else {
      newFish.push(newNum);
    }
  });
  return newFish;
}

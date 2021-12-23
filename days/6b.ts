import input from "./6input";
import { memoize } from "lodash";

// const input = "3,4,3,1,2";

function simulate(timer: number, days: number): number {
  if (days === 0) return 1;
  if (timer === 0) return cached(6, days - 1) + cached(8, days - 1);
  else return cached(timer - 1, days - 1);
}

const cached = memoize(simulate, (timer, days) => days - timer);

export default function() {
  let fish = input.trim().split(",").map(str => parseInt(str));

  const fishDescendants = fish.map(timer => cached(timer, 256));
  const output = fishDescendants.reduce((a, b) => a + b, 0);
  console.log(output);
}

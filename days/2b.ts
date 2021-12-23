import input from "./2Input";

type Direction = "forward" | "down" | "up"

export default function() {
  const parsedInput: Array<[Direction, number]> = input
    .trim()
    .split("\n")
    .map(line => line.split(" "))
    .map(([direction, amount]) => [direction as Direction, parseInt(amount)])

  let aim = 0;
  let depth = 0;
  let horiz = 0;

  parsedInput.forEach(([direction, amount]) => {
    switch (direction) {
      case "down":
        aim += amount;
        break;
      case "up":
        aim -= amount;
        break;
      case "forward":
        horiz += amount;
        depth += aim * amount;
        break;
    }
  });

  console.log(depth * horiz);
}

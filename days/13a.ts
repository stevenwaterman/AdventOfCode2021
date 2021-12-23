import input from "./13input";
import { uniqBy } from "lodash";

// const input = `
// 6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5
// `;

type Dot = {x: number; y: number};
type Fold = {direction: "x" | "y"; value: number};
export default function() {
  const [dotStrings, foldStrings] = input.trim().split("\n\n");

  const dots: Dot[] = dotStrings.split("\n").map(line => {
    const [x, y] = line.split(",").map(str => parseInt(str))
    return {x,y};
  });

  const folds: Fold[] = foldStrings.split("\n").map(line => {
    const [dirStr, valueStr] = line.split("=");
    const direction = dirStr === "fold along x" ? "x" : "y";
    const value = parseInt(valueStr);
    return { direction, value };
  });
  
  const firstFold = folds[0];
  const newDots = fold(dots, firstFold);
  console.log(newDots.length)
}

function fold(dots: Dot[], fold: Fold): Dot[] {
  const newDots = dots.map(dot => foldDot(dot, fold)).filter(dot => dot !== null);
  return uniqBy(newDots, dot => JSON.stringify(dot));
}

function foldDot(dot: Dot, fold: Fold): Dot | null {
  if (fold.direction === "x" && dot.x === fold.value) return null;
  if (fold.direction === "y" && dot.y === fold.value) return null;
  if (fold.direction === "x" && dot.x < fold.value) return dot;
  if (fold.direction === "y" && dot.y < fold.value) return dot;
  if (fold.direction === "x") {
    const delta = dot.x - fold.value;
    const newX = fold.value - delta;
    return { x: newX, y: dot.y };
  }
  if (fold.direction === "y") {
    const delta = dot.y - fold.value;
    const newY = fold.value - delta;
    return { x: dot.x, y: newY };
  }
}
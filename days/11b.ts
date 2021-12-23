import input from "./11input";

// const input = `
// 5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526
// `;

export default function() {
  const energy: number[][] = input.trim().split("\n").map(line => line.trim().split("").map(char => parseInt(char)));

  // console.log("Initial");
  // printGrid(energy);

  for (let step = 0; true; step++) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        energy[y][x]++;
      }
    }

    while (true) {
      let anyFlashed = false;
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          if (energy[y][x] >= 10) {
            // Flash
            anyFlashed = true;
            energy[y][x] = -1000000000000;
            
            if (x > 0) energy[y][x-1]++;
            if (y > 0) energy[y-1][x]++;
            if (x < 9) energy[y][x+1]++;
            if (y < 9) energy[y+1][x]++;
            if (x > 0 && y > 0) energy[y-1][x-1]++;
            if (x > 0 && y < 9) energy[y+1][x-1]++;
            if (x < 9 && y > 0) energy[y-1][x+1]++;
            if (x < 9 && y < 9) energy[y+1][x+1]++;
          }
        }
      }
      if (!anyFlashed) break;
    }
    
    let allFlashed = true;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (energy[y][x] < 0) energy[y][x] = 0;
        else allFlashed = false;
      }
    }

    if (allFlashed) {
      console.log(step + 1);
      return;
    }

    // if (step <= 10) {
      // console.log("After Step", step + 1);
      // printGrid(energy);
    // }
  }

  // console.log(flashCount);
}

function printGrid(energy: number[][]) {
  console.log(energy.map(line => line.map(num => Math.max(0, num)).join("")).join("\n") + "\n");
}
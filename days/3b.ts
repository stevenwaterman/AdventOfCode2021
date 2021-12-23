import input from "./3input";

export default function() {
  const parsedInput = input.trim().split("\n").map(line => line.trim());

  const oxygen = parseReport(parsedInput, (bit, common) => {
    if (bit === "1" && common === "-") return true;
    return bit === common;
  })

  const scrubber = parseReport(parsedInput, (bit, common) => {
    if (bit === "0" && common === "-") return true;
    return bit !== common;
  })

  console.log(oxygen * scrubber);
}

function parseReport(lines: string[], bitCondition: (bit: "0" | "1", common: "0" | "1" | "-") => boolean): number {
  let filterArray = [...lines];
  
  for (let i = 0; i < 12 && filterArray.length > 1; i++) {
    const sum = filterArray.reduce((acc, elem) => acc + (elem === "1" ? 1 : 0), 0);
    const mostCommon = sum < 0 ? "0" : sum > 0 ? "1" : "-";
    filterArray = filterArray.filter(line => bitCondition(line[i] as "0" | "1", mostCommon));
  }
  
  return parseInt(filterArray[0], 2);
}
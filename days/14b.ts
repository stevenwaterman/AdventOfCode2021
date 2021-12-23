import { memoize, mergeWith } from "lodash";
import input from "./14input";

const [template, ruleStrings] = input.trim().split("\n\n");
const rules = ruleStrings.split("\n").map(line => line.split(" -> ") as [string, string]).map(([req, res]) => ({req, res}));
const ruleMap: Record<string, string> = {};
rules.forEach(({req, res}) => ruleMap[req] = res);

export default function() {
  const steps = 40;

  const counts: Record<string, number> = {};
  for (let idx = 0; idx < template.length - 1; idx++) {
    const pair = template.slice(idx, idx + 2);
    const newCounts = cachedExpand(pair, steps);
    mergeWith(counts, newCounts, (a: number | undefined, b: number | undefined) => (a ?? 0) + (b ?? 0));
  }
  counts[template[template.length - 1]] = (counts[template[template.length - 1]] ?? 0) + 1;
  
  const countList = Object.values(counts);
  console.log(Math.max(...countList) - Math.min(...countList))
}

function expandPair(pair: string, steps: number): Record<string, number> {
  if (steps === 0) return { [pair[0]]: 1 }; // Don't count the last character, it's the 1st elsewhere

  const midChar = ruleMap[pair];
  const count1 = cachedExpand(pair[0] + midChar, steps - 1);
  const count2 = cachedExpand(midChar + pair[1], steps - 1);

  const count = mergeWith({}, count1, count2, (a: number | undefined, b: number | undefined) => (a ?? 0) + (b ?? 0));
  return count;
}

const cachedExpand = memoize(expandPair, (pair, steps) => pair + steps);

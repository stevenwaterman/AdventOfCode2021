import { countBy } from "lodash";
import input from "./14input";

export default function() {
  const [template, ruleStrings] = input.trim().split("\n\n");

  const rules = ruleStrings.split("\n").map(line => line.split(" -> ") as [string, string]).map(([req, res]) => ({req, res}));
  const ruleMap: Record<string, string> = {};
  rules.forEach(({req, res}) => ruleMap[req] = res);

  let polymer = template;
  // console.log("Template: ", polymer);

  for (let step = 1; step <= 10; step++) {
    let newPolymer = "";

    for (let idx = 0; idx < polymer.length - 1; idx++) {
      const req = polymer.slice(idx, idx + 2);
      const res = ruleMap[req];
      newPolymer += req[0];
      if (res !== undefined) newPolymer += res;
    }

    newPolymer += polymer[polymer.length - 1];
    polymer = newPolymer;
    // console.log("After step ", step, ":", polymer);
  }

  const counts = Object.values(countBy(polymer.split("")));
  console.log(Math.max(...counts) - Math.min(...counts))
}
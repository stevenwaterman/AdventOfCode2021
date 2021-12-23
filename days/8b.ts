import input from "./8input";

type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

type Digit1 = [Segment, Segment];
type Digit2 = [Segment, Segment, Segment, Segment, Segment];
type Digit3 = [Segment, Segment, Segment, Segment, Segment];
type Digit4 = [Segment, Segment, Segment, Segment];
type Digit5 = [Segment, Segment, Segment, Segment, Segment];
type Digit6 = [Segment, Segment, Segment, Segment, Segment, Segment];
type Digit7 = [Segment, Segment, Segment];
type Digit8 = [Segment, Segment, Segment, Segment, Segment, Segment, Segment];
type Digit9 = [Segment, Segment, Segment, Segment, Segment, Segment];
type Digit0 = [Segment, Segment, Segment, Segment, Segment, Segment];
type Digit = Digit1 | Digit2 | Digit3 | Digit4 | Digit5 | Digit6 | Digit7 | Digit8 | Digit9 | Digit0;

type Examples = [Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit];
type Display = [Digit, Digit, Digit, Digit];

type Problem = [Examples, Display];

export default function() {
  const problems = input.trim().split("\n").map(line => parseProblem(line));
  const answers = problems.map(computeAnswer);
  const sum = answers.reduce((a,b) => a+b);
  console.log(sum);
}

function parseProblem(line: string): Problem {
  const [exampleString, displayString] = line.split(" | ");

  const examples = exampleString.split(" ").map(digit => digit.split("") as Digit);
  const display = displayString.split(" ").map(digit => digit.split("") as Digit);

  return [examples as Examples, display as Display];
}

function computeAnswer(problem: Problem) {
  const mapping = computeMapping(problem[0]);
  const displayDigits = problem[1].map(digit => applyMapping(digit, mapping));
  return parseInt(displayDigits.join(""));
}

function computeMapping(examples: Examples): Record<Segment, Segment> {
/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/

  const cf: [Segment, Segment] = examples.find(example => example.length === 2) as [Segment, Segment];
  const a: Segment = examples.find(example => example.length === 3).find(segment => !cf.includes(segment));
  const bd: [Segment, Segment] = examples.find(example => example.length === 4).filter(segment => !cf.includes(segment)) as [Segment, Segment];
  const g: Segment = examples
                      .filter(example => example.length === 6)
                      .find(example => example.filter(segment => segment !== a && !cf.includes(segment) && !bd.includes(segment)).length === 1)
                      .find(segment => segment !== a && !cf.includes(segment) && !bd.includes(segment));
  const e: Segment = examples
                      .find(example => example.length === 7)
                      .find(segment => !cf.includes(segment) && segment !== a && !bd.includes(segment) && segment !== g);

  const f: Segment = examples
                      .filter(example => example.length === 6)
                      .find(example => example.filter(segment => segment !== a && !bd.includes(segment) && segment !== e && segment !== g).length === 1)
                      .find(segment => segment !== a && !bd.includes(segment) && segment !== e && segment !== g);

  const c: Segment = cf.find(segment => segment !== f);

  const b: Segment = examples
                      .filter(example => example.length === 6)
                      .find(example => example.filter(segment => segment !== a && !cf.includes(segment) && segment !== e && segment !== g).length === 1)
                      .find(segment => segment !== a && !cf.includes(segment) && segment !== e && segment !== g);

  const d: Segment = bd.find(segment => segment !== b);

  const mapping: Record<Segment, Segment> = {} as any;
  mapping[a] = "a";
  mapping[b] = "b";
  mapping[c] = "c";
  mapping[d] = "d";
  mapping[e] = "e";
  mapping[f] = "f";
  mapping[g] = "g";
  return mapping;
}

const digit0Segments = ["a", "b", "c", "e", "f", "g"] as Digit;
const digit1Segments = ["c", "f"] as Digit;
const digit2Segments = ["a", "c", "d", "e", "g"] as Digit;
const digit3Segments = ["a", "c", "d", "f", "g"] as Digit;
const digit4Segments = ["b", "c", "d", "f"] as Digit;
const digit5Segments = ["a", "b", "d", "f", "g"] as Digit;
const digit6Segments = ["a", "b", "d", "e", "f", "g"] as Digit;
const digit7Segments = ["a", "c", "f"] as Digit;
const digit8Segments = ["a", "b", "c", "d", "e", "f", "g"] as Digit;
const digit9Segments = ["a", "b", "c", "d", "f", "g"] as Digit;

function applyMapping(digit: Digit, mapping: Record<Segment, Segment>): number {
  const intendedSegments: Set<Segment> = new Set(digit.map(segment => mapping[segment]));

  if (intendedSegments.size === digit0Segments.length && digit0Segments.every(segment => intendedSegments.has(segment))) return 0;
  if (intendedSegments.size === digit1Segments.length && digit1Segments.every(segment => intendedSegments.has(segment))) return 1;
  if (intendedSegments.size === digit2Segments.length && digit2Segments.every(segment => intendedSegments.has(segment))) return 2;
  if (intendedSegments.size === digit3Segments.length && digit3Segments.every(segment => intendedSegments.has(segment))) return 3;
  if (intendedSegments.size === digit4Segments.length && digit4Segments.every(segment => intendedSegments.has(segment))) return 4;
  if (intendedSegments.size === digit5Segments.length && digit5Segments.every(segment => intendedSegments.has(segment))) return 5;
  if (intendedSegments.size === digit6Segments.length && digit6Segments.every(segment => intendedSegments.has(segment))) return 6;
  if (intendedSegments.size === digit7Segments.length && digit7Segments.every(segment => intendedSegments.has(segment))) return 7;
  if (intendedSegments.size === digit8Segments.length && digit8Segments.every(segment => intendedSegments.has(segment))) return 8;
  if (intendedSegments.size === digit9Segments.length && digit9Segments.every(segment => intendedSegments.has(segment))) return 9;

  console.error("seen digit", digit);
  console.error("mapping", mapping);
  console.error("mapped", intendedSegments);
  throw new Error("Unrecognised digit");
}

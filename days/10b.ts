import input from "./10input";

// const input = `
// [({(<(())[]>[[{[]{<()<>>
//   [(()[<>])]({[<{<<[]>>(
//   {([(<{}[<>[]}>{[]{[(<()>
//   (((({<>}<{<{<>}{[]{[]{}
//   [[<[([]))<([[{}[[()]]]
//   [{[{({}]{}}([{[{{{}}([]
//   {<[[]]>}<{[{[{[]{()[[[]
//   [<(<(<(<{}))><([]([]()
//   <{([([[(<>()){}]>(<<{{
//   <{([{{}}[<[[[<>{}]]]>[]]
//     `;

export default function() {
  const lines = input.trim().split("\n").map(line => line.trim());
  const scores = lines.map(line => getScore(line)).filter(score => score !== null);
  scores.sort((a,b) => a-b);

  const middleScore = scores[Math.floor(scores.length / 2)];
  console.log(middleScore);
}

function getScore(line: string): number | null {
  const expectedCharacters: string[] = [];

  for (const char of line) {
    if (char === "(") expectedCharacters.unshift(")");
    else if (char === "[") expectedCharacters.unshift("]");
    else if (char === "{") expectedCharacters.unshift("}");
    else if (char === "<") expectedCharacters.unshift(">");
    else if (char === expectedCharacters[0]) expectedCharacters.shift();
    else return null; // Corrupted
  }
  
  let score = 0;

  for (const char of expectedCharacters) {
    score *= 5;
    if (char === ")") score += 1;
    else if (char === "]") score += 2;
    else if (char === "}") score += 3;
    else if (char === ">") score += 4;
    else throw new Error("Unrecognised character " + char);
  }

  return score;
}
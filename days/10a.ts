import input from "./10input";

export default function() {
  const lines = input.trim().split("\n").map(line => line.trim());
  const scores = lines.map(line => getScore(line));
  const total = scores.reduce((a,b) => a+b);
  console.log(total);
}

function getScore(line: string): number {
  const expectedCharacters: string[] = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "(") expectedCharacters.unshift(")");
    else if (char === "[") expectedCharacters.unshift("]");
    else if (char === "{") expectedCharacters.unshift("}");
    else if (char === "<") expectedCharacters.unshift(">");
    else if (char === expectedCharacters[0]) expectedCharacters.shift();
    else if (char === ")") return 3;
    else if (char === "]") return 57;
    else if (char === "}") return 1197;
    else if (char === ">") return 25137;
    else throw new Error("Unrecognised Character " + char);
  }

  return 0;
}
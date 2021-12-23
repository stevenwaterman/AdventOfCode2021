import input from "./8input";

export default function() {
  const allDisplayDigits: string[] = 
    input
      .trim()
      .split("\n")
      .map(line => {
        const [examples, display] = line.split(" | ");
        const displayDigits = display.split(" ");
        return displayDigits;
      })
      .flat();

  const wantedDigits = allDisplayDigits.filter(digit => digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7);
  console.log(wantedDigits.length);
}
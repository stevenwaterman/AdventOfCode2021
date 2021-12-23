import input from "./4input";

type Board = number[][];

export default function() {
  const paragraphs = input.split("\n\n");
  const order = paragraphs[0].split(",").map(num => parseInt(num.trim()));

  let boards: Board[] = paragraphs.slice(1).map(parseBoard);

  const seenNumbers: Set<number> = new Set();

  for (const newNumber of order) {
    seenNumbers.add(newNumber);
    const newBoards = boards.filter(board => !hasBoardWon(board, seenNumbers));

    if (newBoards.length === 0) {
      const lastBoard = boards[0];
      const score = getBoardScore(lastBoard, seenNumbers, newNumber);
      console.log(score)
      break;
    }

    boards = newBoards;
  }
}


function parseBoard(boardString: string): Board {
  return boardString
    .trim()
    .split("\n")
    .map(line => 
      line
        .trim()
        .split(" ")
        .filter(str => str.length > 0)
        .map(num => parseInt(num.trim())));
}

function hasBoardWon(board: Board, seenNumbers: Set<number>) {
  // Check rows
  if (board.some(row => row.every(num => seenNumbers.has(num)))) return true;

  // Check cols
  for (let i = 0; i < 5; i++) {
    if (board.every(row => seenNumbers.has(row[i]))) return true;
  }

  return false;
}

function getBoardScore(board: Board, seenNumbers: Set<number>, lastNumber: number): number {
  const sum = board
    .flat()
    .filter(num => !seenNumbers.has(num))
    .reduce((acc, elem) => acc + elem, 0);
  return sum * lastNumber;
}
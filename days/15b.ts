import { last, minBy } from "lodash";
import input from "./15input";

// const input = `
// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581
// `;

type Node = {
  id?: string;
  risk: number;
  up?: Node;
  right?: Node;
  down?: Node;
  left?: Node;
  
  prior?: Node;
  shortestPath?: number;
  finished: boolean;
}

export default function() {
  const template: Node[][] = input.trim().split("\n").map(line => line.trim().split("").map(char => ({risk: parseInt(char), finished: false})));

  const templateWidth = template[0].length;
  const templateHeight = template.length;

  const width = templateWidth * 5;
  const height = templateHeight * 5;

  const nodes: Node[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Node[] = [];
    nodes.push(row);

    for (let x = 0; x < width; x++) {
      const templateX = x % templateWidth;
      const templateY = y % templateHeight;
      const templateNode = template[templateY][templateX];

      const sectionX = (x - templateX) / templateWidth;
      const sectionY = (y - templateY) / templateHeight;

      const riskIncrease = sectionX + sectionY;
      const newRisk = (templateNode.risk + riskIncrease - 1) % 9 + 1;

      row.push({
        risk: newRisk,
        finished: false
      });
    }
  }


  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const node = nodes[y][x];
      node.up = nodes[y-1]?.[x];
      node.right = nodes[y]?.[x+1];
      node.down = nodes[y+1]?.[x];
      node.left = nodes[y]?.[x-1];
      node.id = x + "," + y;
    }
  }

  nodes[0][0].shortestPath = 0;

  const nodesToProcess: Node[] = nodes.flat();
  const nodeCount = nodesToProcess.length;
  let doneCount = 0;

  while (true) {
    const nodesWithPathLength = nodesToProcess.filter(node => !node.finished && node.shortestPath !== undefined);
    if (nodesWithPathLength.length === 0) break;

    const node = minBy(nodesWithPathLength, node => node.shortestPath);
    node.finished = true;

    const { up, right, down, left } = node;
    checkEdge(node, up);
    checkEdge(node, right);
    checkEdge(node, down);
    checkEdge(node, left);

    doneCount++;
    if (doneCount % 1000 === 0) {
      console.log((doneCount / nodeCount).toFixed(2));
    }
  }

  console.log(last(last(nodes)).shortestPath)
}

function checkEdge(src: Node, dest: Node | undefined) {
  if (dest !== undefined) {
    if (!dest.finished) {
      if (dest.shortestPath === undefined || dest.shortestPath > src.shortestPath + dest.risk) {
        dest.prior = src;
        dest.shortestPath = src.shortestPath + dest.risk
      }
    }
  }
}

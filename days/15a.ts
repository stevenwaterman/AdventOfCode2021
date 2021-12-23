import { last, minBy } from "lodash";
import input from "./15input";

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
  const nodes: Node[][] = input.trim().split("\n").map(line => line.trim().split("").map(char => ({risk: parseInt(char), finished: false})));

  const width = nodes[0].length;
  const height = nodes.length;

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

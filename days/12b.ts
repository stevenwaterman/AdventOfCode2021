import input from "./12input";

// const input = `
// dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc
// `;

type Graph = Record<string, {
  big: boolean;
  destinations: string[]
}>;

type Path = string[];

export default function() {
  const graph: Graph = {};

  input.trim().split("\n").forEach(line => {
    const [start, end] = line.split("-");

    if (graph[start] === undefined) {
      graph[start] = {
        big: start === start.toUpperCase(),
        destinations: [end]
      }
    } else {
      graph[start].destinations.push(end);
    }

    if (graph[end] === undefined) {
      graph[end] = {
        big: end === end.toUpperCase(),
        destinations: [start]
      }
    } else {
      graph[end].destinations.push(start);
    }
  });

  const paths: Path[] = traverse(graph);
  console.log("Done, deduping");

  const uniquePaths: Set<string> = new Set();
  paths.forEach(path => uniquePaths.add(JSON.stringify(path)));
  console.log(uniquePaths.size);
}

function traverse(graph: Graph, path: Path = ["start"], doubleVisitSmallCave: string | null = null): Path[] {
  const currentNode = path[path.length - 1];
  if (currentNode === "end") return [path];

  const possibleNextNode = graph[currentNode].destinations;
  const bigNextNodes = possibleNextNode.filter(node => graph[node].big);
  const smallNextNodes = possibleNextNode.filter(node => !bigNextNodes.includes(node) && !path.includes(node));
  const specialNextNodes = possibleNextNode.filter(node => node !== "start" && node !== "end" && doubleVisitSmallCave === null && !bigNextNodes.includes(node) && !smallNextNodes.includes(node));

  const bigOutput = bigNextNodes.flatMap(node => traverse(graph, [...path, node], doubleVisitSmallCave));
  const smallOutput = smallNextNodes.flatMap(node => traverse(graph, [...path, node], doubleVisitSmallCave));
  const specialOutput = specialNextNodes.flatMap(node => traverse(graph, [...path, node], node));

  const output = [...bigOutput, ...smallOutput, ...specialOutput];
  return output;
}
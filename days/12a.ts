import input from "./12input";

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
  console.log(paths.length);
}

function traverse(graph: Graph, path: Path = ["start"]): Path[] {
  const currentNode = path[path.length - 1];
  if (currentNode === "end") return [path];

  const possibleNextNode = graph[currentNode].destinations;
  const allowedNextNodes = possibleNextNode.filter(node => graph[node].big || !path.includes(node));
  const output = allowedNextNodes.flatMap(node => traverse(graph, [...path, node]));
  return output;
}
import { readv } from "fs";
import input from "./16input";

type Bits = (0 | 1)[];

export default function() {
  const bits: Bits = parseInt(input, 16).toString(2).split("").map(char => char === "1" ? 1 : 0);
}

function readPacketVersion(bits: Bits, startIdx: number): { version: number, bitsConsumed: number } {
  const version = readValue(bits, startIdx, 3);
  return { version, bitsConsumed: 3 };
}

function readValue(bits: Bits, startIdx: number, length: number): number {
  const binary = bits.slice(startIdx, startIdx + length).map(num => num === 1 ? "1" : "0").join("");
  return parseInt(binary, 2);
}
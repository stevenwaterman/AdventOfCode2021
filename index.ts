import func from "./days/16b";
import {performance} from "perf_hooks";

const startTime = performance.now();
func()
const endTime = performance.now();
console.log(`${(endTime - startTime).toFixed(2)} ms`);

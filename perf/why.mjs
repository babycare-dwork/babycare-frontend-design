import { readFileSync } from "node:fs";

const lhr = JSON.parse(readFileSync("perf/runs/baby-detail-1.json", "utf8"));
console.log("final URL   :", lhr.finalDisplayedUrl ?? lhr.finalUrl);
console.log("runtimeError:", lhr.runtimeError);
console.log("warnings    :", lhr.runWarnings);
const a = lhr.audits["largest-contentful-paint"];
console.log(
  "LCP audit   :",
  a?.scoreDisplayMode,
  a?.errorMessage,
  a?.numericValue,
);
const w = lhr.audits["total-byte-weight"];
console.log(
  "weight audit:",
  w?.scoreDisplayMode,
  w?.errorMessage,
  w?.numericValue,
);

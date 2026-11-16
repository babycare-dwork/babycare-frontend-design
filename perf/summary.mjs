import { readdirSync, readFileSync } from "node:fs";

const dir = "perf/results";
const rows = readdirSync(dir)
  .filter((f) => f.endsWith(".report.json"))
  .sort()
  .map((f) => {
    const a = JSON.parse(readFileSync(`${dir}/${f}`, "utf8")).audits;
    return {
      page: f.replace(".report.json", ""),
      "LCP (s)": (a["largest-contentful-paint"].numericValue / 1000).toFixed(2),
      CLS: a["cumulative-layout-shift"].numericValue.toFixed(3),
      "TBT (ms)": Math.round(a["total-blocking-time"].numericValue),
      "Weight (KB)": Math.round(a["total-byte-weight"].numericValue / 1024),
    };
  });

console.table(rows);

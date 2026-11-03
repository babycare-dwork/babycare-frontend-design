import { readFileSync, writeFileSync } from "node:fs";

const name = process.argv[2];
if (!name) throw new Error("usage: node perf/check.mjs <report-name>");

const lhr = JSON.parse(
  readFileSync(`perf/results/${name}.report.json`, "utf8"),
);

console.log("requested:", lhr.requestedUrl);
console.log("final    :", lhr.finalDisplayedUrl ?? lhr.finalUrl);
console.log("warnings :", lhr.runWarnings);

const data = lhr.audits["final-screenshot"]?.details?.data;
if (data) {
  const ext = data.startsWith("data:image/png") ? "png" : "jpg";
  writeFileSync(
    `perf/results/${name}-final.${ext}`,
    Buffer.from(data.split(",")[1], "base64"),
  );
  console.log(`saved perf/results/${name}-final.${ext}`);
}

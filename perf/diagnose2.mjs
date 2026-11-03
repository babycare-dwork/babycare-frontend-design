import { readdirSync, readFileSync } from "node:fs";

const dir = "perf/results";
const DETAILS = [
  "bootup-time",
  "third-parties-insight",
  "render-blocking-insight",
  "image-delivery-insight",
  "unused-javascript",
];

for (const f of readdirSync(dir).filter((x) => x.endsWith(".report.json"))) {
  const audits = JSON.parse(readFileSync(`${dir}/${f}`, "utf8")).audits;
  console.log(`\n===== ${f.replace(".report.json", "")} =====`);

  console.log("--- audits scoring below 0.9");
  for (const a of Object.values(audits)) {
    if (typeof a.score === "number" && a.score < 0.9) {
      console.log(
        `${a.score.toFixed(2)}  ${a.title}${a.displayValue ? " — " + a.displayValue : ""}`,
      );
    }
  }

  for (const id of DETAILS) {
    const items = audits[id]?.details?.items;
    if (!items?.length) continue;
    console.log(`--- ${id}`);
    console.dir(items.slice(0, 6), { depth: 2 });
  }
}

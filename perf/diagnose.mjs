import { readdirSync, readFileSync } from "node:fs";

const dir = "perf/results";

for (const f of readdirSync(dir).filter((x) => x.endsWith(".report.json"))) {
  const audits = JSON.parse(readFileSync(`${dir}/${f}`, "utf8")).audits;
  console.log(`\n===== ${f.replace(".report.json", "")} =====`);

  for (const id of [
    "largest-contentful-paint-element",
    "lcp-breakdown-insight",
    "lcp-discovery-insight",
  ]) {
    if (audits[id]?.details) {
      console.log(`--- ${id}`);
      console.dir(audits[id].details.items ?? audits[id].details, { depth: 3 });
    }
  }

  console.log("--- heaviest requests");
  const items = audits["network-requests"]?.details?.items ?? [];
  items
    .filter((i) => i.transferSize > 0)
    .sort((a, b) => b.transferSize - a.transferSize)
    .slice(0, 8)
    .forEach((i) =>
      console.log(
        `${Math.round(i.transferSize / 1024)} KB`.padStart(8),
        i.resourceType?.padEnd(11),
        i.url.slice(0, 100),
      ),
    );
}

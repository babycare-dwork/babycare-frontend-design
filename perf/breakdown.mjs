import { readdirSync, readFileSync } from "node:fs";

const dir = "perf/results";
const rows = [];

for (const f of readdirSync(dir)
  .filter((x) => x.endsWith(".report.json"))
  .sort()) {
  const a = JSON.parse(readFileSync(`${dir}/${f}`, "utf8")).audits;
  const d = a["lcp-breakdown-insight"]?.details;
  const parts = Array.isArray(d)
    ? d.find((x) => x.type === "table")?.items
    : d?.items;
  const node = Array.isArray(d) ? d.find((x) => x.type === "node") : undefined;
  const get = (k) => {
    const v = parts?.find((p) => p.subpart === k)?.duration;
    return v == null ? "-" : Math.round(v);
  };
  rows.push({
    page: f.replace(".report.json", ""),
    TTFB: get("timeToFirstByte"),
    "load delay": get("resourceLoadDelay"),
    "load time": get("resourceLoadDuration"),
    "render delay": get("elementRenderDelay"),
    "LCP element": node?.nodeLabel?.slice(0, 32) ?? "-",
  });
}

console.table(rows);

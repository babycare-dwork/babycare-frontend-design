import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";

const BASE = "http://localhost:3000";
const RUNS = 3;
const PAGES = [
  { name: "home", url: "/" },
  { name: "products", url: "/products" },
  {
    name: "product-detail",
    url: "/products/alias-rerum-rerum-eum-consequuntur-voluptate-reiciendis-variant-hxjzk",
  },
  { name: "baby-detail", url: "/baby/1", auth: true },
  {
    name: "checkout",
    url: "/checkout?items=cb42b10b-d2d9-4135-a064-686146628e28",
    auth: true,
  },
];

mkdirSync("perf/runs", { recursive: true });

const nums = (xs) => xs.filter((x) => Number.isFinite(x));
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const fmt = (xs, digits) => {
  const n = nums(xs);
  return n.length ? median(n).toFixed(digits) : "n/a";
};

const rows = [];
for (const p of PAGES) {
  const lcp = [],
    cls = [],
    tbt = [],
    kb = [];
  for (let i = 1; i <= RUNS; i++) {
    const out = `perf/runs/${p.name}-${i}.json`;
    if (!existsSync(out)) {
      console.log(`${p.name} run ${i}/${RUNS} (measuring)`);
      const cmd =
        `npx lighthouse "${BASE}${p.url}" ` +
        (p.auth ? "--extra-headers=perf/headers.json " : "") +
        `--only-categories=performance --output=json --output-path=${out} ` +
        `--chrome-flags="--headless=new" --quiet`;
      try {
        execSync(cmd, { stdio: "ignore" });
      } catch {
        /* the Windows temp-dir cleanup warning can exit non-zero; the report is still written */
      }
    } else {
      console.log(`${p.name} run ${i}/${RUNS} (reusing saved report)`);
    }
    if (!existsSync(out)) {
      console.log(`  no report written for ${p.name} run ${i}`);
      continue;
    }
    const lhr = JSON.parse(readFileSync(out, "utf8"));
    const a = lhr.audits;
    const finalPath = new URL(lhr.finalDisplayedUrl ?? lhr.finalUrl).pathname;
    if (finalPath !== new URL(BASE + p.url).pathname) {
      console.log(
        `  WARNING: ${p.name} run ${i} ended on ${finalPath} (redirected?)`,
      );
    }
    lcp.push(a["largest-contentful-paint"]?.numericValue / 1000);
    cls.push(a["cumulative-layout-shift"]?.numericValue);
    tbt.push(a["total-blocking-time"]?.numericValue);
    kb.push(a["total-byte-weight"]?.numericValue / 1024);
  }
  const l = nums(lcp);
  rows.push({
    page: p.name,
    "LCP runs": l.length,
    "LCP s (median)": fmt(lcp, 2),
    "LCP range": l.length
      ? `${Math.min(...l).toFixed(1)}-${Math.max(...l).toFixed(1)}`
      : "n/a",
    "CLS runs": nums(cls).length,
    CLS: fmt(cls, 3),
    "TBT ms": fmt(tbt, 0),
    "Weight KB": fmt(kb, 0),
  });
}
console.table(rows);

import { readFileSync, writeFileSync } from "node:fs";

const lhr = JSON.parse(
  readFileSync("perf/results/baby-detail.report.json", "utf8"),
);

console.log("requested:", lhr.requestedUrl);
console.log("final    :", lhr.finalDisplayedUrl ?? lhr.finalUrl);
console.log("warnings :", lhr.runWarnings);

const lcpNode =
  lhr.audits["largest-contentful-paint-element"]?.details?.items?.[0]
    ?.items?.[0]?.node;
console.log(
  "LCP element:",
  lcpNode?.nodeLabel,
  "|",
  lcpNode?.snippet?.slice(0, 160),
);

function save(dataUri, name) {
  if (!dataUri) return console.log(`no data for ${name}`);
  const ext = dataUri.startsWith("data:image/png") ? "png" : "jpg";
  const file = `perf/results/${name}.${ext}`;
  writeFileSync(file, Buffer.from(dataUri.split(",")[1], "base64"));
  console.log("saved", file);
}

save(lhr.audits["final-screenshot"]?.details?.data, "baby-detail-final");
save(lhr.fullPageScreenshot?.screenshot?.data, "baby-detail-full");

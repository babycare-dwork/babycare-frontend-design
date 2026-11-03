import { readFileSync, writeFileSync } from "node:fs";

const state = JSON.parse(readFileSync("e2e/.auth/desktop.json", "utf8"));
const cookie = state.cookies.find((c) => c.name === "_baby");
if (!cookie) throw new Error("No _baby cookie found in e2e/.auth/desktop.json");

writeFileSync(
  "perf/headers.json",
  JSON.stringify({ Cookie: `_baby=${cookie.value}` }),
);
console.log("wrote perf/headers.json");

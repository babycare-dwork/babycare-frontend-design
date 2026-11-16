import autocannon from "autocannon";
import { readFileSync } from "node:fs";

const [path = "/", connections = "10", seconds = "30"] = process.argv.slice(2);

const headers = {};
if (path.startsWith("/baby")) {
  const state = JSON.parse(readFileSync("e2e/.auth/desktop.json", "utf8"));
  const cookie = state.cookies.find((c) => c.name === "_baby");
  if (!cookie)
    throw new Error("No _baby cookie found in e2e/.auth/desktop.json");
  headers.cookie = `_baby=${cookie.value}`;
}

const r = await autocannon({
  url: `http://localhost:3000${path}`,
  connections: Number(connections),
  duration: Number(seconds),
  headers,
});

console.table([
  {
    path,
    connections,
    seconds,
    requests: r.requests.total,
    "2xx": r["2xx"],
    failed: r.non2xx + r.errors + r.timeouts,
    non2xx: r.non2xx,
    errors: r.errors,
    timeouts: r.timeouts,
    "avg ms": r.latency.average,
    "p99 ms": r.latency.p99,
    "req/s": r.requests.average,
  },
]);

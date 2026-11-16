# Performance baseline (2026-11-03)

**How measured.** Production build (`next build`, `next start`) on a local machine against a local test backend (no staging exists). Lighthouse CLI, mobile profile, 3 runs per page, median reported. INP measured separately with Playwright (Pixel 5 profile, 4x CPU slowdown). Load test with autocannon, 30 s per run, against localhost. These are lab numbers from one machine, not real-user data. No earlier measurements exist, so BC-05 and BC-14 cannot be compared against a "before".

## Core Web Vitals (mobile)

| Page               | LCP (median) | LCP range | CLS   | INP                    | TBT    | Weight  |
| ------------------ | ------------ | --------- | ----- | ---------------------- | ------ | ------- |
| `/`                | 12.93 s      | 9.2-14.2  | 0.000 | 184 ms (1 interaction) | 566 ms | 4036 KB |
| `/products`        | 8.78 s       | 8.8-8.8   | 0.000 | 120 ms (search typing) | 343 ms | 1900 KB |
| `/products/[slug]` | 11.45 s      | 8.6-12.8  | 0.000 | 64 ms (2 interactions) | 603 ms | 3904 KB |
| `/baby/1`          | 0.87 s       | 0.9-0.9   | 0.001 | 296 ms                 | 597 ms | 1013 KB |
| `/checkout`        | 1.07 s       | 1.1-1.1   | 0.000 | 64 ms                  | 442 ms | 1581 KB |

Targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
**Not met:** LCP on `/`, `/products`, `/products/[slug]`; INP on `/baby/1`.
Notes: INP on `/`, `/products` and `/products/[slug]` rests on 1-2 interactions each and is weak evidence. TBT is not INP and is shown only as context.

## Load test (autocannon, 30 s per run)

| Page      | Connections | Requests | Failed       | Avg      | p99      | Req/s |
| --------- | ----------- | -------- | ------------ | -------- | -------- | ----- |
| `/`       | 10          | 7,155    | 0            | 41.6 ms  | 230 ms   | 238.5 |
| `/`       | 50          | 9,878    | 0            | 151 ms   | 867 ms   | 329.3 |
| `/baby/1` | 10          | 106      | 0            | 2,745 ms | 4,887 ms | 3.5   |
| `/baby/1` | 50          | 40 ok    | 110 timeouts | 5,452 ms | 9,992 ms | 1.3   |

Target: 0 failed requests at C=50. **Not met on `/baby/1`.** Cause not investigated.

## Client JavaScript per route (`next experimental-analyze`, compressed)

| Route              | Compressed | Over 200 KB |
| ------------------ | ---------- | ----------- |
| `/baby/[infantId]` | 900.7 KB   | Yes         |
| `/`                | 778.1 KB   | Yes         |
| `/products/[slug]` | 747.4 KB   | Yes         |
| `/products`        | 741.4 KB   | Yes         |
| `/checkout`        | 727.8 KB   | Yes         |

All 24 routes with client code exceed 200 KB, and even `/_not-found` is 575.8 KB, so most of the weight is a shared base loaded on every page. Full list: `perf/results/bundle-sizes.txt`.

## Follow-up work (not done in this ticket)

1. **Image weight.** `images.unoptimized: true` in `next.config.ts` serves originals at full size (home 4 MB, product page 3.9 MB). Needs a team decision on turning the optimizer on. Likely the main cause of the LCP failures; not proven.
2. **Shared JavaScript base** of about 575 KB on every route.
3. **`/baby/1` under load:** 2.7 s average at C=10 and timeouts at C=50. Not diagnosed (Next server vs backend unknown).
4. **`/baby/1` INP of 296 ms** (calculator typing, Calculate, chart tabs). Slowest interaction not isolated.
5. **Error handling:** `/baby/1` returned HTTP 500 while the backend was unreachable.
6. **Backend:** `GET /api/v1/fetch-all-vaccines` returns 500 on the test backend.
7. **`priority` to `preload`:** the hero, header logo and product image were migrated to Next 16's `preload` plus `fetchPriority="high"`. No measurable LCP change.

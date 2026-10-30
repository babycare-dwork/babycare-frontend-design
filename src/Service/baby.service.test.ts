import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import babyService from "@/Service/baby.service";
import { server } from "@/test/server";
import { VACCINE_STATUS_LABELS, type VaccineStatus } from "@/types/vaccine";

describe("babyService.infantCalculator", () => {
  it("POSTs infant_id and weight in the body", async () => {
    let body: unknown;
    server.use(
      http.post("*/infant-calculator", async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ data: {} });
      }),
    );

    await babyService.infantCalculator({ infant_id: 7, weight: 6.4 });

    expect(body).toEqual({ infant_id: 7, weight: 6.4 });
  });

  it("includes optional height and head_circumference when given", async () => {
    let body: unknown;
    server.use(
      http.post("*/infant-calculator", async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ data: {} });
      }),
    );

    await babyService.infantCalculator({
      infant_id: 7,
      weight: 6.4,
      height: 62,
      head_circumference: 40,
    });

    expect(body).toMatchObject({ height: 62, head_circumference: 40 });
  });
});

describe("babyService.getVaccines", () => {
  function captureQuery() {
    const seen: { type: string | null; path: string } = {
      type: null,
      path: "",
    };
    server.use(
      http.get("*/infant/:id", ({ request }) => {
        const url = new URL(request.url);
        seen.type = url.searchParams.get("type");
        seen.path = url.pathname;
        return HttpResponse.json({ data: [] });
      }),
    );
    return seen;
  }

  it("defaults the filter to A", async () => {
    const seen = captureQuery();
    await babyService.getVaccines(3);
    expect(seen.type).toBe("A");
    expect(seen.path).toMatch(/\/infant\/3$/);
  });

  it.each(["A", "C", "E", "D"] as VaccineStatus[])(
    "sends type=%s",
    async (type) => {
      const seen = captureQuery();
      await babyService.getVaccines(3, type);
      expect(seen.type).toBe(type);
    },
  );

  it("only defines the statuses A, C, E and D", () => {
    expect(Object.keys(VACCINE_STATUS_LABELS)).toEqual(["A", "C", "E", "D"]);
  });
});

describe("babyService.updateBabyVaccineDate", () => {
  it("PATCHes vaccine_id to the infant's URL", async () => {
    let body: unknown;
    let path = "";
    server.use(
      http.patch("*/update-vaccinated-date/:id", async ({ request }) => {
        body = await request.json();
        path = new URL(request.url).pathname;
        return HttpResponse.json({});
      }),
    );

    await babyService.updateBabyVaccineDate(5, 12);

    expect(body).toEqual({ vaccine_id: 12 });
    expect(path).toMatch(/\/update-vaccinated-date\/5$/);
  });
});

describe("babyService other endpoints", () => {
  it("getAllBaby GETs /infant with params", async () => {
    let search = "";
    server.use(
      http.get("*/infant", ({ request }) => {
        search = new URL(request.url).search;
        return HttpResponse.json({ data: [] });
      }),
    );
    await babyService.getAllBaby({ page: 2 });
    expect(search).toBe("?page=2");
  });

  it("getBabbyDetails GETs /infant", async () => {
    let called = false;
    server.use(
      http.get("*/infant", () => {
        called = true;
        return HttpResponse.json({ data: {} });
      }),
    );
    await babyService.getBabbyDetails();
    expect(called).toBe(true);
  });

  it("addBaby POSTs the form data to /infant", async () => {
    let name: FormDataEntryValue | null = null;
    server.use(
      http.post("*/infant", async ({ request }) => {
        name = (await request.formData()).get("name");
        return HttpResponse.json({});
      }),
    );
    const form = new FormData();
    form.append("name", "Asha");
    await babyService.addBaby(form);
    expect(name).toBe("Asha");
  });

  it("updateBaby POSTs to /infant/:id with _method=PATCH", async () => {
    let method: FormDataEntryValue | null = null;
    let path = "";
    server.use(
      http.post("*/infant/:id", async ({ request }) => {
        method = (await request.formData()).get("_method");
        path = new URL(request.url).pathname;
        return HttpResponse.json({});
      }),
    );
    await babyService.updateBaby(4, new FormData());
    expect(method).toBe("PATCH");
    expect(path).toMatch(/\/infant\/4$/);
  });

  it("deleteBaby sends DELETE to /infant/:id", async () => {
    let path = "";
    server.use(
      http.delete("*/infant/:id", ({ request }) => {
        path = new URL(request.url).pathname;
        return HttpResponse.json({});
      }),
    );
    await babyService.deleteBaby(9);
    expect(path).toMatch(/\/infant\/9$/);
  });

  it("getAllVaccines GETs /fetch-all-vaccines", async () => {
    let called = false;
    server.use(
      http.get("*/fetch-all-vaccines", () => {
        called = true;
        return HttpResponse.json({ data: [] });
      }),
    );
    await babyService.getAllVaccines();
    expect(called).toBe(true);
  });

  it("getInfantCalculatorHistory sends page params", async () => {
    let search = "";
    server.use(
      http.get("*/infant-calculator/history/:id", ({ request }) => {
        search = new URL(request.url).search;
        return HttpResponse.json({ data: {} });
      }),
    );
    await babyService.getInfantCalculatorHistory(3, { page: 2, per_page: 5 });
    expect(search).toContain("page=2");
    expect(search).toContain("per_page=5");
  });

  it("getInfantChart sends the indicator", async () => {
    let indicator: string | null = null;
    server.use(
      http.get("*/infant/:id/chart", ({ request }) => {
        indicator = new URL(request.url).searchParams.get("indicator");
        return HttpResponse.json({ data: {} });
      }),
    );
    await babyService.getInfantChart(3, "weight");
    expect(indicator).toBe("weight");
  });

  it("rethrows request errors", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    server.use(
      http.get("*/fetch-all-vaccines", () =>
        HttpResponse.json({ message: "fail" }, { status: 500 }),
      ),
    );
    await expect(babyService.getAllVaccines()).rejects.toBeDefined();
    spy.mockRestore();
  });
});

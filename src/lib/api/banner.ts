import "server-only";
import type { Banner } from "@/types/banner";

interface BannerResponse {
  status: boolean;
  data: Banner[];
  message: string;
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/market/banner`,
      {
        next: { revalidate: 100, tags: ["banners"] },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!res.ok) {
      console.error(`[getBanners] ${res.status} ${res.statusText}`, res.url);
      return [];
    }

    const json: BannerResponse = await res.json();
    return json.status ? (json.data ?? []) : [];
  } catch (error) {
    console.error("[getBanners] request failed:", error);
    return [];
  }
}

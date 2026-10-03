import Image from "next/image";
import Link from "next/link";

/** Featured brands banner — full image, clickable through to the shop. */
export function PromoBanner() {
  return (
    <section className="container mx-auto px-4 sm:px-8">
      <Link
        href="/products"
        aria-label="Shop featured baby essentials"
        className="group relative block aspect-[1920/720] w-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-200 ease-out hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-3xl"
      >
        <Image
          src="/banner.jpg"
          alt="Featured baby essentials — formula, vitamins and diapers"
          fill
          sizes="(max-width: 1536px) 100vw, 1536px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Link>
    </section>
  );
}

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { SectionHeading } from "@/components/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Sonia Shakya",
    image: "/testo1.png",
    message:
      "As a new parent, this platform has been a life saver. From daily essentials to vaccination reminders and nearby healthcare centers, everything I need is in one place. It truly makes parenting easier and stress free.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aarav Joshi",
    image: "/testo1.png",
    message:
      "The vaccination reminders and baby care tips are incredibly helpful. I feel more confident and organized as a parent thanks to this platform.",
    rating: 5,
  },
  {
    id: 3,
    name: "Nisha Karki",
    image: "/testo1.png",
    message:
      "Finding genuine baby products and nearby healthcare centers has never been easier. Everything is well explained and easy to use.",
    rating: 4,
  },
  {
    id: 4,
    name: "Rohit Adhikari",
    image: "/testo1.png",
    message:
      "This platform truly understands modern parenting needs. The expert guidance and health tools make a real difference.",
    rating: 5,
  },
  {
    id: 5,
    name: "Pooja Shrestha",
    image: "/testo1.png",
    message:
      "I love how everything is available in one place—from shopping to healthcare tracking. It saves so much time and effort.",
    rating: 4,
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-surface-sunken">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What parents say"
          lead="Trusted by thousands of parents across Nepal."
          align="center"
          className="mb-10 sm:mb-12"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Arch-framed photo */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-t-[999px] rounded-b-[36px] border-2 border-dashed border-coral/50"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-blush-soft">
              <Image
                key={currentTestimonial.id}
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                fill
                className="object-cover animate-in fade-in duration-500"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-2 flex size-16 items-center justify-center rounded-full bg-coral-strong text-on-coral shadow-md sm:-right-5"
            >
              <Quote className="size-7 fill-current" />
            </span>
          </div>

          {/* Quote */}
          <figure
            key={currentTestimonial.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div
              className="mb-6 flex gap-1"
              role="img"
              aria-label={`Rated ${currentTestimonial.rating} out of 5`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  aria-hidden="true"
                  className={
                    i < currentTestimonial.rating
                      ? "fill-honey text-honey"
                      : "fill-line text-line"
                  }
                />
              ))}
            </div>

            <blockquote className="mb-8 font-display text-[22px] leading-[34px] font-bold text-ink sm:text-[26px] sm:leading-[38px]">
              &ldquo;{currentTestimonial.message}&rdquo;
            </blockquote>

            <figcaption className="mb-10 flex items-center gap-3">
              <span className="h-0.5 w-10 rounded-full bg-coral" aria-hidden="true" />
              <span className="font-display text-lg font-bold text-ink">
                {currentTestimonial.name}
              </span>
              <span className="text-sm text-ink-muted">· Parent</span>
            </figcaption>

            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      index === currentIndex
                        ? "w-8 bg-coral-strong"
                        : "w-2.5 bg-line-strong/50 hover:bg-line-strong"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === currentIndex}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductReview from "@/components/product/ProductReview";

const { getProductReviews } = vi.hoisted(() => ({
  getProductReviews: vi.fn(),
}));

vi.mock("@/Service/product.service", () => ({
  default: { getProductReviews },
}));
vi.mock("@/components/product/ReviewForm", () => ({ default: () => null }));
vi.mock("@/components/field/SelectInput", () => ({ default: () => null }));
vi.mock("@/components/Custom-Pagination", () => ({ default: () => null }));
vi.mock("@/components/product/ReviewCard", () => ({
  default: ({ review }: { review: { review: string } }) => (
    <div role="listitem">{review.review}</div>
  ),
}));

function item(id: string, rating: number) {
  return {
    comment_uuid: id,
    rating,
    review: `review ${id}`,
    user_name: "u",
    user_email: "u@x.com",
    image: "",
    user_type: { user_type: 1, label: "Parent" },
    review_date: "2026-01-01",
    is_review_edited: false,
  };
}

function reviews(ratings: number[]) {
  return {
    status: true,
    message: "",
    data: {
      items: ratings.map((r, i) => item(String(i), r)),
      page: 1,
      total_page: 1,
      total_items: ratings.length,
    },
  };
}

function renderReviews() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <ProductReview slug="bib" />
    </QueryClientProvider>,
  );
}

describe("ProductReview", () => {
  beforeEach(() => getProductReviews.mockReset());

  it("shows the average rating and the distribution", async () => {
    getProductReviews.mockResolvedValue(reviews([5, 4, 4]));
    renderReviews();

    expect(
      await screen.findByLabelText("Average rating: 4.3 out of 5"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("67% of reviews are 4 stars"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("shows the empty state when there are no reviews", async () => {
    getProductReviews.mockResolvedValue(reviews([]));
    renderReviews();
    expect(
      await screen.findByText(/be the first to review/i),
    ).toBeInTheDocument();
  });
});

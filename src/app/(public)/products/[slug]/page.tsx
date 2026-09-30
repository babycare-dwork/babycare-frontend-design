"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingCart,
  Star,
  Store,
} from "lucide-react";
import Image from "next/image";
import productService from "@/Service/product.service";
import ProductReview from "@/components/product/ProductReview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import type { AxiosError } from "axios";
import cartService from "@/Service/cart.service";
import { useAuth } from "@/hooks/useAuth";

export interface Category {
  name: string;
  slug: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface ProductData {
  product_uuid: string;
  name: string;
  for_product?: "planning" | "baby" | "pregnant";
  slug: string;
  price: number;
  previous_price: number;
  discount_percent: number;
  age_group_year_from?: string;
  age_group_year_to?: string;
  size: string;
  brand: string;
  description: string;
  added_date: string;
  rating: number;
  tags: Tag[];
  categories: Category[];
  featured_image: string;
  gallery_images: string[];
  liked: boolean;
  stock: number;
  store_name: string;
}

export interface ProductDetailsResponse {
  status: boolean;
  data: ProductData;
  message: string;
}

interface ErrorResponse {
  message: string;
}

interface FavoriteResponse {
  status: boolean;
  data: { liked: boolean };
  message: string;
}

const FOR_PRODUCT_LABELS: Record<
  NonNullable<ProductData["for_product"]>,
  string
> = {
  planning: "For Planning",
  baby: "For Baby",
  pregnant: "For Pregnant",
};

const TOTAL_STARS = 5;
const MIN_QUANTITY = 1;
const DESCRIPTION_COLLAPSED_HEIGHT = 96;

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-muted/30">
    <div className="max-w-container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 lg:py-10 space-y-6 sm:space-y-8">
      <div className="bg-white rounded-lg md:rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="space-y-3 sm:space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg md:rounded-xl" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <Skeleton className="h-6 sm:h-8 w-3/4" />
            <Skeleton className="h-10 sm:h-12 w-1/2" />
            <Skeleton className="h-24 sm:h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center space-y-2 bg-white border rounded-lg md:rounded-xl p-6 sm:p-8 max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold">Product Not Found</h2>
      <p className="text-sm sm:text-base text-muted-foreground">
        Unable to load product details
      </p>
    </div>
  </div>
);

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return axiosError.response?.data?.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    useState(false);
  const [descriptionEl, setDescriptionEl] = useState<HTMLDivElement | null>(
    null,
  );

  const { data, isLoading, error } = useQuery<ProductDetailsResponse>({
    queryKey: ["product", slug],
    queryFn: () => productService.getProduct(slug as string),
    enabled: !!slug,
    staleTime: 60000,
    retry: 2,
  });

  const product = data?.data;

  useEffect(() => {
    if (!descriptionEl) return;

    const check = () =>
      setIsDescriptionOverflowing(
        descriptionEl.scrollHeight > DESCRIPTION_COLLAPSED_HEIGHT + 1,
      );

    check();

    const observer = new ResizeObserver(check);
    observer.observe(descriptionEl);
    // Children resize even while the container is clamped
    Array.from(descriptionEl.children).forEach((child) =>
      observer.observe(child),
    );

    return () => observer.disconnect();
  }, [descriptionEl, product?.description]);

  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [slug]);

  const { mutate: addToCart, isPending: isCartPending } = useMutation({
    mutationFn: (payload: { slug: string; quantity: number }) =>
      cartService.addToCart(payload).then((res) => {
        toast.success(res.message || "Product added to cart");
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: (error) => {
      toast.error(error?.message || "Please try again");
    },
  });

  const { mutate: toggleFavorite, isPending: isFavoritePending } = useMutation<
    FavoriteResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: (productSlug: string) =>
      productService.addToFavorite(productSlug),
    onSuccess: (response) => {
      const message = response?.message || "Favorite updated successfully";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ["product", slug] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  const images = useMemo(
    () => (product ? [product.featured_image, ...product.gallery_images] : []),
    [product],
  );

  const discountAmount = useMemo(
    () => (product ? product.previous_price - product.price : 0),
    [product],
  );

  const handleFavoriteClick = useCallback(() => {
    if (slug) {
      toggleFavorite(slug);
    }
  }, [slug, toggleFavorite]);

  const handleQuantityDecrease = useCallback(() => {
    setQuantity((prev) => Math.max(MIN_QUANTITY, prev - 1));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    if (product) {
      setQuantity((prev) => Math.min(product.stock, prev + 1));
    }
  }, [product]);

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (slug && product && quantity > 0 && quantity <= product.stock) {
      addToCart({ slug, quantity });
    }
  }, [addToCart, slug, quantity, product]);

  const handleCheckout = useCallback(() => {
    if (!user && !isAuthenticated) {
      toast.error("Please login to checkout");
      return;
    }
    if (!product) {
      toast.error("Product not available");
      return;
    }

    startTransition(() => {
      const checkoutData = {
        uuid: product.product_uuid,
        quantity: quantity,
      };

      queryClient.setQueryData(["checkout-items"], [checkoutData]);

      const searchParams = new URLSearchParams();
      searchParams.append("items", product.product_uuid);
      searchParams.append("quantity", quantity.toString());

      router.push(`/checkout?${searchParams.toString()}`);
      // router.push('/checkout')
    });
  }, [product, quantity, queryClient, router, user, isAuthenticated]);

  if (isLoading) return <LoadingSkeleton />;
  if (error || !product) return <ErrorState />;

  const isInStock = product.stock > 0;
  const hasDiscount = product.discount_percent > 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 space-y-6 sm:space-y-8">
        <article className="bg-white rounded-lg md:rounded-xl border shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 p-3 sm:p-4 md:p-6 lg:p-8">
            <section
              className="space-y-3 sm:space-y-4"
              aria-label="Product images"
            >
              <div className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden bg-muted">
                <Image
                  src={images[selectedImage]}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  priority={selectedImage === 0}
                />
                {hasDiscount && (
                  <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
                    -{product.discount_percent}%
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className={cn(
                    "absolute top-2 right-2 sm:top-3 sm:right-3 shadow-md h-8 w-8 sm:h-10 sm:w-10 transition-colors",
                    product.liked && "bg-red-50 hover:bg-red-100",
                  )}
                  onClick={handleFavoriteClick}
                  disabled={isFavoritePending}
                  aria-label={
                    product.liked ? "Remove from favorites" : "Add to favorites"
                  }
                  aria-pressed={product.liked}
                >
                  <Heart
                    className={cn(
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all",
                      product.liked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600",
                    )}
                  />
                </Button>
              </div>

              <div
                className="grid grid-cols-5 gap-1.5 sm:gap-2"
                role="list"
                aria-label="Product image gallery"
              >
                {images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => handleImageSelect(idx)}
                    className={cn(
                      "aspect-square rounded-md md:rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50",
                    )}
                    aria-label={`View image ${idx + 1} of ${images.length}`}
                    aria-current={selectedImage === idx}
                    role="listitem"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </section>

            <section
              className="space-y-4 sm:space-y-6"
              aria-label="Product information"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                  <span className="font-semibold text-primary uppercase">
                    {product.brand}
                  </span>
                  <span className="text-muted-foreground">|</span>
                  {product.categories.map((cat, idx) => (
                    <span key={cat.slug} className="text-muted-foreground">
                      {cat.name}
                      {idx < product.categories.length - 1 && ", "}
                    </span>
                  ))}
                  {product.for_product && (
                    <Badge
                      variant="outline"
                      className="border-pink-200 bg-pink-50 text-pink-700 text-xs"
                    >
                      {FOR_PRODUCT_LABELS[product.for_product] ??
                        product.for_product}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Store className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">
                    Sold by:{" "}
                    <span className="text-foreground">
                      {product.store_name}
                    </span>
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label={`Rated ${product.rating.toFixed(1)} out of ${TOTAL_STARS} stars`}
                  >
                    {Array.from({ length: TOTAL_STARS }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5 sm:h-4 sm:w-4",
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.previous_price > product.price && (
                  <>
                    <span className="text-lg sm:text-xl line-through text-muted-foreground">
                      {formatPrice(product.previous_price)}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 text-xs sm:text-sm"
                    >
                      Save {formatPrice(discountAmount)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="border-t border-b py-3 sm:py-4 space-y-3">
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  {(product.age_group_year_from ||
                    product.age_group_year_to) && (
                    <div>
                      <span className="text-muted-foreground">Age Range: </span>
                      <span className="font-semibold">
                        {product.age_group_year_from ?? "—"} -{" "}
                        {product.age_group_year_to ?? "—"}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Size: </span>
                    <span className="font-semibold">{product.size}</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="text-muted-foreground">Stock: </span>
                  <span
                    className={cn(
                      "font-semibold",
                      isInStock
                        ? isLowStock
                          ? "text-orange-600"
                          : "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {isInStock ? `${product.stock} available` : "Out of stock"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2 text-sm sm:text-base">
                  Description
                </h2>

                <div className="relative">
                  <div
                    ref={setDescriptionEl}
                    className="prose prose-sm max-w-none text-muted-foreground text-xs sm:text-sm overflow-hidden transition-[max-height] duration-300"
                    style={{
                      maxHeight: isDescriptionExpanded
                        ? descriptionEl?.scrollHeight
                        : DESCRIPTION_COLLAPSED_HEIGHT,
                    }}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />

                  {/* Fade overlay when collapsed */}
                  {isDescriptionOverflowing && !isDescriptionExpanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>

                {isDescriptionOverflowing && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                    className="mt-2 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline"
                    aria-expanded={isDescriptionExpanded}
                  >
                    {isDescriptionExpanded ? (
                      <>
                        See less <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        See more <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {product.tags.length > 0 && (
                <div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  role="list"
                  aria-label="Product tags"
                >
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag.slug}
                      variant="outline"
                      className="text-xs"
                      role="listitem"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <div
                  className="flex items-center border rounded-lg overflow-hidden w-fit"
                  role="group"
                  aria-label="Quantity selector"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= MIN_QUANTITY}
                    aria-label="Decrease quantity"
                    className={cn(
                      "h-9 w-9 sm:h-10 sm:w-10 rounded-none hover:bg-muted",
                      quantity <= MIN_QUANTITY &&
                        "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <span className="text-lg font-medium">−</span>
                  </Button>
                  <span
                    className="px-4 sm:px-6 font-semibold border-x text-sm sm:text-base min-w-[3rem] sm:min-w-[4rem] text-center"
                    aria-live="polite"
                    aria-label={`Quantity: ${quantity}`}
                  >
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleQuantityIncrease}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className={cn(
                      "h-9 w-9 sm:h-10 sm:w-10 rounded-none hover:bg-muted",
                      quantity >= product.stock &&
                        "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <span className="text-lg font-medium">+</span>
                  </Button>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                  <Button
                    className={cn(
                      "flex-1 h-9 sm:h-10 lg:h-11 text-sm sm:text-base",
                      !isInStock && "opacity-60",
                    )}
                    onClick={handleCheckout}
                    disabled={!isInStock || isPending}
                    aria-label={isInStock ? "Checkout now" : "Out of stock"}
                  >
                    <ShoppingCart className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {isPending ? "Processing..." : "Checkout"}
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 h-9 sm:h-10 lg:h-11 text-sm sm:text-base",
                      !isInStock && "opacity-60",
                    )}
                    onClick={handleAddToCart}
                    disabled={!isInStock || isCartPending}
                    aria-label={isInStock ? "Add to cart" : "Out of stock"}
                  >
                    <ShoppingCart className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {isInStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </article>

        <ProductReview slug={slug as string} />
      </div>
    </div>
  );
}

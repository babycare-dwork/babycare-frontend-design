"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartService from "@/Service/cart.service";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productService from "@/Service/product.service";
import RatingDisplay from "@/components/Rating";

interface Product {
  name: string;
  slug: string;
  brand: string;
  rating: number;
  price: number;
  previous_price: number;
  feature_image: string;
  discount_percent: number;
  liked: boolean;
  stock: number;
  store_name: string;
  age_group: string | null;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, className }) => {
    const {
      name,
      price,
      previous_price,
      feature_image,
      slug,
      stock,
      liked,
      rating,
      discount_percent,
      age_group,
    } = product;
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(liked);
    const [quantity, setQuantity] = useState(1);

    const { mutate: addToCart, isPending } = useMutation({
      mutationFn: (payload: { slug: string; quantity: number }) =>
        cartService.addToCart(payload).then((res) => {
          toast.success(res.message || "Product added to cart");
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      },
      onError: (error) => {
        toast.error(error?.message || "Please try again");
      },
    });

    const { mutate: toggleFavorite, isPending: isFavoritePending } =
      useMutation({
        mutationFn: () =>
          productService.addToFavorite(slug).then((res) => {
            toast.success(res.message || "Product added to favorite");
          }),
        onSuccess: () => {
          setIsLiked((prev) => !prev);
          queryClient.invalidateQueries({ queryKey: ["products"] });
          queryClient.invalidateQueries({ queryKey: ["favorites"] });
          queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
        onError: (error) => {
          toast.error(error?.message || "Please try again");
        },
      });

    const handleAddToCart = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > 0 && quantity <= stock) {
          addToCart({ slug, quantity });
        }
      },
      [addToCart, slug, quantity, stock],
    );

    const handleToggleFavorite = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite();
      },
      [toggleFavorite],
    );

    const handleProductClick = useCallback(
      () => router.push(`/products/${slug}`),
      [router, slug],
    );

    const incrementQuantity = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuantity((prev) => Math.min(prev + 1, stock));
      },
      [stock],
    );

    const decrementQuantity = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setQuantity((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleQuantityChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, Math.min(value, stock)));
      },
      [stock],
    );

    const isOutOfStock = stock === 0;

    return (
      <div
        onClick={handleProductClick}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col rounded-2xl bg-card p-2.5 shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-3",
          className,
        )}
      >
        {/* Media */}
        <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-surface-sunken">
          <Image
            src={feature_image}
            alt={name}
            width={260}
            height={260}
            className="h-full w-full object-contain p-3 mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105 sm:p-4"
            loading="lazy"
          />

          {discount_percent > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-coral-strong px-2.5 py-1 text-xs font-bold leading-none text-on-coral">
              -{discount_percent}%
            </span>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 size-9 rounded-full bg-surface-raised shadow-sm hover:bg-blush-soft hover:text-coral-strong"
            onClick={handleToggleFavorite}
            disabled={isFavoritePending}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isLiked}
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                isLiked ? "fill-coral-strong text-coral-strong" : "text-ink-muted",
              )}
            />
          </Button>

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/70">
              <span className="rounded-full bg-danger-soft px-3 py-1 text-sm font-bold text-danger">
                Out of stock
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex min-h-0 grow flex-col px-1">
          {age_group && (
            <span className="mb-1.5 truncate text-xs font-bold text-coral-strong">
              {age_group}
            </span>
          )}

          <h3 className="mb-1.5 line-clamp-2 font-display text-[15px] leading-snug font-bold text-ink sm:text-base">
            {name}
          </h3>

          <RatingDisplay rating={rating} maxRating={5} size="sm" />

          <div className="mt-auto pt-3">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-2">
              <p className="whitespace-nowrap font-display text-lg font-extrabold text-ink sm:text-xl">
                Rs. {price.toFixed(0)}
              </p>
              {previous_price > price && (
                <p className="whitespace-nowrap text-xs text-ink-muted line-through sm:text-sm">
                  Rs. {previous_price.toFixed(0)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex h-10 shrink-0 items-center rounded-full bg-surface-sunken"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-raised disabled:opacity-45 sm:size-9"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || isOutOfStock}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3.5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={stock}
                  aria-label="Quantity"
                  className="w-6 bg-transparent text-center text-sm font-bold text-ink outline-none [appearance:textfield] sm:w-7 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onChange={handleQuantityChange}
                  disabled={isOutOfStock}
                />
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-raised disabled:opacity-45 sm:size-9"
                  onClick={incrementQuantity}
                  disabled={quantity >= stock || isOutOfStock}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              <Button
                size="sm"
                className="h-10 flex-1 px-3 has-[>svg]:px-3"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                aria-label={isOutOfStock ? "Out of stock" : `Add ${name} to cart`}
              >
                <ShoppingCart />
                <span className="hidden sm:inline">
                  {isOutOfStock ? "Sold out" : "Add"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;

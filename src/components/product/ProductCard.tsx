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
import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";

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
          "bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full relative",
          className,
        )}
      >
        <div className="aspect-square relative mb-3 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={feature_image}
            alt={name}
            width={220}
            height={220}
            className="object-contain w-full h-full"
            loading="lazy"
          />

          {discount_percent > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">
              {discount_percent}% OFF
            </span>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/90 shadow-sm hover:bg-white"
            onClick={handleToggleFavorite}
            disabled={isFavoritePending}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isLiked}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-500",
              )}
            />
          </Button>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-bold px-3 py-1 bg-red-600 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col grow min-h-0">
          {age_group && (
            <span className="text-[11px] sm:text-xs font-medium text-primary mb-1 truncate">
              {age_group}
            </span>
          )}

          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5">
            {name}
          </h3>

          <RatingDisplay rating={rating} maxRating={5} size="sm" />
          <Separator className="w-full my-4" />

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] leading-none mb-1 text-gray-900 font-semibold">
                  Price
                </p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-base sm:text-xl font-bold text-gray-900">
                    Rs. {price.toFixed(0)}
                  </p>
                  {previous_price > price && (
                    <p className="text-xs sm:text-sm text-gray-400 line-through">
                      Rs. {previous_price.toFixed(0)}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="flex items-center border border-gray-300 rounded-full overflow-hidden shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-none hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || isOutOfStock}
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  min={1}
                  max={stock}
                  className="w-8 sm:w-10 h-7 sm:h-8 text-center border-0 text-xs sm:text-sm p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0"
                  onChange={handleQuantityChange}
                  disabled={isOutOfStock}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-none hover:bg-gray-100"
                  onClick={incrementQuantity}
                  disabled={quantity >= stock || isOutOfStock}
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full rounded-full bg-primary text-white text-xs sm:text-sm h-8 sm:h-9"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isPending}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;

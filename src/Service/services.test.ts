import { describe, expect, it, vi } from "vitest";
import { capture, type Method } from "@/test/capture";
import addressService from "@/Service/address.service";
import { authService } from "@/Service/auth.service";
import brandService from "@/Service/brand.service";
import cartService from "@/Service/cart.service";
import categoriesService from "@/Service/category.service";
import orderService from "@/Service/order.service";
import productService from "@/Service/product.service";
import profileService from "@/Service/profile.service";
import tipsService from "@/Service/tips.service";

interface Case {
  name: string;
  method: Method;
  path: string;
  call: () => Promise<unknown>;
  search?: string;
  body?: unknown;
}

const cases: Case[] = [
  // address
  {
    name: "address.getAllAddress",
    method: "get",
    path: "/market/user/address",
    search: "?page=1",
    call: () => addressService.getAllAddress({ page: 1 }),
  },
  {
    name: "address.createAddress",
    method: "post",
    path: "/market/user/address",
    body: { label: "Home" },
    call: () => addressService.createAddress({ label: "Home" }),
  },
  {
    name: "address.updateAddress",
    method: "put",
    path: "/market/user/address/4",
    body: { label: "Work" },
    call: () => addressService.updateAddress({ label: "Work" }, 4),
  },
  {
    name: "address.deleteAddress",
    method: "delete",
    path: "/market/user/address/4",
    call: () => addressService.deleteAddress(4),
  },

  // cart
  {
    name: "cart.addToCart",
    method: "post",
    path: "/market/add-to-cart",
    body: { slug: "bib", quantity: 2 },
    call: () => cartService.addToCart({ slug: "bib", quantity: 2 }),
  },
  {
    name: "cart.getCartDetails",
    method: "post",
    path: "/market/checkout-detail",
    body: ["u1", "u2"],
    call: () => cartService.getCartDetails(["u1", "u2"]),
  },
  {
    name: "cart.updateCartItem",
    method: "post",
    path: "/market/update-cart-item/u1",
    body: { quantity: 3 },
    call: () => cartService.updateCartItem("u1", 3),
  },
  {
    name: "cart.getMyCart",
    method: "get",
    path: "/market/my-cart",
    call: () => cartService.getMyCart(),
  },
  {
    name: "cart.removeCartItems",
    method: "delete",
    path: "/market/remove-cart-item",
    body: { item_uuids: ["u1", "u2"] },
    call: () => cartService.removeCartItems(["u1", "u2"]),
  },

  // product
  {
    name: "product.getAllProducts",
    method: "get",
    path: "/market/products",
    search: "?page=2",
    call: () => productService.getAllProducts({ page: 2 }),
  },
  {
    name: "product.getProduct",
    method: "get",
    path: "/market/product/bib",
    call: () => productService.getProduct("bib"),
  },
  {
    name: "product.getProductReviews",
    method: "get",
    path: "/market/product/bib/review",
    search: "?page=1",
    call: () => productService.getProductReviews("bib", { page: 1 }),
  },
  {
    name: "product.addToFavorite",
    method: "get",
    path: "/market/favourite/bib/product",
    call: () => productService.addToFavorite("bib"),
  },
  {
    name: "product.createProductReview",
    method: "post",
    path: "/market/product/bib/review",
    body: { rating: 5, review: "Nice" },
    call: () =>
      productService.createProductReview("bib", { rating: 5, review: "Nice" }),
  },
  {
    name: "product.updateProductReview",
    method: "patch",
    path: "/market/product/bib/review/r1",
    body: { rating: 4 },
    call: () => productService.updateProductReview("bib", "r1", { rating: 4 }),
  },
  {
    name: "product.deleteProductReview",
    method: "delete",
    path: "/market/product/bib/review/r1",
    call: () => productService.deleteProductReview("bib", "r1"),
  },
  {
    name: "product.favouritesProduct",
    method: "get",
    path: "/market/liked-items",
    search: "?page=1",
    call: () => productService.favouritesProduct({ page: 1 }),
  },

  // auth
  {
    name: "auth.login",
    method: "post",
    path: "/login",
    body: { email: "a@b.com", password: "pw" },
    call: () => authService.login({ email: "a@b.com", password: "pw" }),
  },
  {
    name: "auth.getLoggedInUser",
    method: "get",
    path: "/user",
    call: () => authService.getLoggedInUser(),
  },
  {
    name: "auth.logout",
    method: "post",
    path: "/logout",
    call: () => authService.logout(),
  },
  {
    name: "auth.googleLogin",
    method: "post",
    path: "/login/google",
    body: { token: "t" },
    call: () => authService.googleLogin({ token: "t" }),
  },
  {
    name: "auth.forgotPassword",
    method: "post",
    path: "/password-reset",
    body: { email: "a@b.com" },
    call: () => authService.forgotPassword({ email: "a@b.com" }),
  },
  {
    name: "auth.verifyOtp",
    method: "post",
    path: "/verify-password-reset-token",
    body: { otp: "1" },
    call: () => authService.verifyOtp({ otp: "1" }),
  },
  {
    name: "auth.resetPassword",
    method: "post",
    path: "/handle-password-reset-form",
    body: { password: "x" },
    call: () => authService.resetPassword({ password: "x" }),
  },
  {
    name: "auth.vendorRegister",
    method: "post",
    path: "/vendor/registration",
    body: { name: "V" },
    call: () => authService.vendorRegister({ name: "V" }),
  },

  // order
  {
    name: "order.createOrder",
    method: "post",
    path: "/market/orders",
    body: { products: [] },
    call: () => orderService.createOrder({ products: [] }),
  },
  {
    name: "order.getAllOrder",
    method: "get",
    path: "/market/my-orders",
    search: "?page=1",
    call: () => orderService.getAllOrder({ page: 1 }),
  },
  {
    name: "order.getOrder",
    method: "get",
    path: "/market/my-order-detail/o1",
    search: "?x=1",
    call: () => orderService.getOrder("o1", { x: 1 }),
  },

  // brand, category, profile, tips
  {
    name: "brand.getAllBrands",
    method: "get",
    path: "/market/get-brand-list",
    call: () => brandService.getAllBrands(),
  },
  {
    name: "category.getAllCategories",
    method: "get",
    path: "/market/get-category-list",
    call: () => categoriesService.getAllCategories(),
  },
  {
    name: "profile.getProfile",
    method: "get",
    path: "/market/user/profile",
    call: () => profileService.getProfile(),
  },
  {
    name: "profile.updateProfile (json)",
    method: "post",
    path: "/market/user/profile",
    body: { name: "Asha" },
    call: () => profileService.updateProfile({ name: "Asha" }),
  },
  {
    name: "tips.getHealthyTips",
    method: "get",
    path: "/blog",
    search: "?page=1",
    call: () => tipsService.getHealthyTips({ page: 1 }),
  },
  {
    name: "tips.getHealthyTipsDetails",
    method: "get",
    path: "/blog/sleep",
    call: () => tipsService.getHealthyTipsDetails("sleep"),
  },
];

describe("service request shapes", () => {
  it.each(cases)("$name", async (c) => {
    const seen = capture(c.method, c.path);
    await c.call();

    expect(seen.method).toBe(c.method.toUpperCase());
    expect(seen.path.endsWith(c.path)).toBe(true);
    if (c.search !== undefined) expect(seen.search).toBe(c.search);
    if (c.body !== undefined) expect(seen.body).toEqual(c.body);
  });
});

describe("services with form data", () => {
  it("auth.register sends the form data", async () => {
    const seen = capture("post", "/register");
    const form = new FormData();
    form.append("name", "Asha");
    await authService.register(form);
    expect(String(seen.body)).toContain("Asha");
  });

  it("profile.updateProfile sends form data when given a FormData", async () => {
    const seen = capture("post", "/market/user/profile");
    const form = new FormData();
    form.append("name", "Asha");
    await profileService.updateProfile(form);
    expect(String(seen.body)).toContain("Asha");
  });
});

describe("error handling in httpService", () => {
  it.each([
    ["get", "/market/my-cart", () => cartService.getMyCart()],
    ["post", "/market/orders", () => orderService.createOrder({})],
    [
      "put",
      "/market/user/address/1",
      () => addressService.updateAddress({}, 1),
    ],
    [
      "patch",
      "/market/product/bib/review/r1",
      () => productService.updateProductReview("bib", "r1", {}),
    ],
  ] as [Method, string, () => Promise<unknown>][])(
    "%s rejects on a 500 response",
    async (method, path, call) => {
      const spy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      capture(method, path, 500);
      await expect(call()).rejects.toBeDefined();
      spy.mockRestore();
    },
  );
});

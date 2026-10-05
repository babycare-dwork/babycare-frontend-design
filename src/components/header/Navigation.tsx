"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Baby,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Smartphone,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  BABY_CARE_ADDRESS,
  BABY_CARE_PHONE1,
  BABY_CARE_PHONE2,
  BABY_CARE_PLAY_STORE_URL,
} from "@/config/app-constant";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/Service/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navigationLinks = [
  { href: "/products", label: "Shop" },
  { href: "/health-center", label: "Health Center" },
  { href: "/vaccination-schedule", label: "Vaccination Schedule" },
  { href: "/healthy-tips", label: "Tips" },
] as const;

type AccountLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number;
};

function CountBadge({
  count,
  tone,
}: {
  count: number;
  tone: "orange" | "red";
}) {
  if (count <= 0) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold leading-none ring-2 ring-background",
        tone === "orange" ? "bg-coral-strong text-on-coral" : "bg-danger text-surface-raised",
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function NavigationBar({ className }: { className?: string }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = user?.cart_item_count ?? 0;
  const favoritesCount = user?.favourate_item_count ?? 0;

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery) {
        router.push(`/products?q=${encodeURIComponent(trimmedQuery)}`);
        closeSearch();
        closeMobileMenu();
      }
    },
    [searchQuery, router, closeSearch, closeMobileMenu],
  );

  const handleLogout = useCallback(async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authService.logout();
      localStorage.removeItem("_baby");
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      toast.success("Logout successful", { id: toastId });
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Logout failed", { id: toastId });
    }
  }, [router, queryClient]);

  const isActiveLink = useCallback(
    (href: string) => pathname === href || pathname?.startsWith(`${href}/`),
    [pathname],
  );

  const accountLinks = useMemo<AccountLink[]>(
    () => [
      { href: "/profile", label: "View profile", icon: User },
      { href: "/baby", label: "Baby", icon: Baby },
      { href: "/order", label: "Orders", icon: Package },
      { href: "/cart", label: "My cart", icon: ShoppingCart, count: cartCount },
      {
        href: "/favorites",
        label: "Favorites",
        icon: Heart,
        count: favoritesCount,
      },
    ],
    [cartCount, favoritesCount],
  );

  // Close panels after navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isMobileMenuOpen) closeMobileMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen, isMobileMenuOpen, closeSearch, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const renderUserAvatar = () => {
    if (!user) return null;
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full p-0 ring-2 ring-transparent transition-shadow hover:ring-primary/30 data-[state=open]:ring-primary/30"
            aria-label="Account menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.media || "/placeholder.svg"}
                alt={user.name}
                className="object-contain"
              />
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-64 overflow-hidden rounded-2xl p-0 shadow-xl"
          align="end"
          sideOffset={10}
        >
          <div className="flex items-center gap-3 bg-primary/5 p-4">
            <Avatar className="h-11 w-11 ring-2 ring-background">
              <AvatarImage
                src={user.media || "/placeholder.svg"}
                alt={user.name}
                className="object-contain"
              />
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="p-2">
            {accountLinks.map(({ href, label, icon: Icon, count }) => (
              <DropdownMenuItem key={href} asChild>
                <Link
                  href={href}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{label}</span>
                  {typeof count === "number" && count > 0 && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {count}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>

          <DropdownMenuSeparator className="m-0" />

          <div className="p-2">
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-danger focus:bg-danger-soft focus:text-danger"
            >
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-line bg-surface-raised/95 shadow-sm backdrop-blur-md",
          className,
        )}
      >
        {/* Utility bar (desktop only) — brand navy, echoes the footer */}
        <div className="hidden bg-navy text-on-navy/85 md:block">
          <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[13px] font-semibold sm:px-8">
            <a
              href={BABY_CARE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-sm transition-colors hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Smartphone className="size-3.5 text-sky" aria-hidden="true" />
              Get the app
              <ChevronRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <div className="flex items-center gap-5">
              <a href={`tel:${BABY_CARE_PHONE1}`} className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy">
                <Phone className="size-3.5 text-sky" aria-hidden="true" />
                <span className="hidden lg:inline">{BABY_CARE_PHONE1}</span>
                <span className="sr-only lg:hidden">Call {BABY_CARE_PHONE1}</span>
              </a>
              <a href={`tel:${BABY_CARE_PHONE2}`} className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-navy">
                <Phone className="size-3.5 text-sky" aria-hidden="true" />
                <span className="hidden lg:inline">{BABY_CARE_PHONE2}</span>
                <span className="sr-only lg:hidden">Call {BABY_CARE_PHONE2}</span>
              </a>
              <span className="hidden h-3.5 w-px bg-on-navy/25 xl:block" aria-hidden="true" />
              <span className="hidden items-center gap-1.5 xl:flex">
                <MapPin className="size-3.5 text-sky" aria-hidden="true" />
                {BABY_CARE_ADDRESS}
              </span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav aria-label="Main navigation">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 py-2">
            <Link
              href="/"
              className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="BabyCare Logo"
                className="h-11 w-auto md:h-12 lg:h-14"
                width={100}
                height={100}
                priority
              />
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
              {navigationLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "text-coral-strong after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-coral-strong"
                        : "text-ink hover:text-shield",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "size-11 rounded-full",
                  isSearchOpen && "bg-muted",
                )}
                onClick={toggleSearch}
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                aria-expanded={isSearchOpen}
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>

              {user ? (
                <>
                  <div className="relative hidden sm:block">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="size-11 rounded-full"
                    >
                      <Link href="/cart" aria-label="Shopping cart">
                        <ShoppingCart className="h-5 w-5" />
                      </Link>
                    </Button>
                    <CountBadge count={cartCount} tone="orange" />
                  </div>
                  <div className="relative hidden sm:block">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="size-11 rounded-full"
                    >
                      <Link href="/favorites" aria-label="Favorites">
                        <Heart className="h-5 w-5" />
                      </Link>
                    </Button>
                    <CountBadge count={favoritesCount} tone="red" />
                  </div>
                  <div className="ml-1 hidden sm:block">
                    {renderUserAvatar()}
                  </div>
                </>
              ) : isLoading ? (
                <div className="hidden h-10 w-10 animate-pulse rounded-full bg-muted sm:block" />
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="ml-1 hidden px-6 sm:flex"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="size-11 rounded-full lg:hidden"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search panel (desktop + mobile) */}
          {isSearchOpen && (
            <div className="border-t bg-background animate-in fade-in slide-in-from-top-2 duration-200">
              <form
                onSubmit={handleSearch}
                className="container mx-auto flex items-center gap-2 px-4 py-3"
              >
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for baby products..."
                    className="h-11 w-full rounded-full bg-muted/50 pl-11 pr-4 focus-visible:bg-background"
                    aria-label="Search products"
                    autoComplete="off"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-11 rounded-full px-6"
                  disabled={!searchQuery.trim()}
                >
                  Search
                </Button>
              </form>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile drawer (outside header so backdrop-blur does not trap it) */}
      <div
        className={cn(
          "fixed inset-0 z-60 lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          onClick={closeMobileMenu}
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none",
            isMobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <Image
              src="/logo.png"
              alt="BabyCare Logo"
              className="h-10 w-auto"
              width={100}
              height={100}
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-11 rounded-full"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-primary/5 p-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage
                    src={user.media || "/placeholder.svg"}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {navigationLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold transition-colors",
                      active
                        ? "bg-blush-soft text-coral-strong"
                        : "text-ink hover:bg-muted",
                    )}
                  >
                    {link.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4",
                        active
                          ? "text-coral-strong"
                          : "text-muted-foreground",
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {user ? (
              <div className="mt-4 border-t pt-4">
                <p className="px-4 pb-2 text-xs font-medium text-muted-foreground">
                  My account
                </p>
                <div className="flex flex-col gap-1">
                  {accountLinks.map(({ href, label, icon: Icon, count }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMobileMenu}
                      tabIndex={isMobileMenuOpen ? 0 : -1}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{label}</span>
                      {typeof count === "number" && count > 0 && (
                        <span
                          className={cn(
                            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold text-white",
                            href === "/cart" ? "bg-coral-strong text-on-coral" : "bg-danger text-surface-raised",
                          )}
                        >
                          {count > 99 ? "99+" : count}
                        </span>
                      )}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    className="mt-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-danger transition-colors hover:bg-danger-soft"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              !isLoading && (
                <Button
                  asChild
                  className="mt-4 h-11 w-full rounded-full"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <Link href="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>
              )
            )}
          </div>

          {/* Contact info (hidden on mobile in the old design) */}
          <div className="space-y-2 border-t bg-muted/30 px-5 py-4 text-sm">
            <a
              href={`tel:${BABY_CARE_PHONE1}`}
              className="flex items-center gap-2 text-foreground/80"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <Phone className="h-4 w-4 text-primary" /> {BABY_CARE_PHONE1}
            </a>
            <a
              href={`tel:${BABY_CARE_PHONE2}`}
              className="flex items-center gap-2 text-foreground/80"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <Phone className="h-4 w-4 text-primary" /> {BABY_CARE_PHONE2}
            </a>
            <span className="flex items-start gap-2 text-foreground/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {BABY_CARE_ADDRESS}
            </span>
            <Button
              asChild
              variant="outline"
              className="mt-2 h-10 w-full rounded-full"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <Link
                href={BABY_CARE_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="mr-2 h-4 w-4" /> Get the app
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Aperture,
  Menu,
  LayoutDashboard,
  PlusSquare,
  Building2,
  CalendarCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

/* ─── Nav Links ─────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",            href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works",   href: "/how-it-works" },
  { label: "About Us",       href: "/about" },
] as const;

/* ─── Authenticated Dropdown Items ──────────────────────────────────── */
const USER_MENU_ITEMS = [
  { label: "Dashboard",          href: "/dashboard",   icon: LayoutDashboard },
  { label: "Add New Studio",     href: "/studios/new", icon: PlusSquare },
  { label: "My Studio Listings", href: "/my-studios",  icon: Building2 },
  { label: "My Bookings",        href: "/my-bookings", icon: CalendarCheck },
] as const;

/* ─── Component ─────────────────────────────────────────────────────── */
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-[#1E1E22] bg-[#0C0C0F]/90 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="StudioSpace home"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-lg p-1.5",
              "bg-[#F59E0B]/10 text-[#F59E0B]",
              "transition-all duration-200",
              "group-hover:bg-[#F59E0B]/20 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.3)]"
            )}
          >
            <Aperture className="size-5" strokeWidth={1.75} />
          </span>
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-lg font-bold tracking-tight text-[#F4F4F6]"
          >
            Studio<span className="text-[#F59E0B]">Space</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150",
                    isActive
                      ? "text-[#F59E0B]"
                      : "text-[#A1A1AA] hover:text-[#F4F4F6] hover:bg-[#1C1C20]"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[17px] h-[2px] rounded-full bg-[#F59E0B]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop Auth Area ─────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            /* Authenticated — Avatar + Dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5",
                  "border border-transparent transition-all duration-150",
                  "hover:border-[#2E2E34] hover:bg-[#141417]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/40"
                )}
              >
                <Avatar size="default">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name ?? "User"}
                  />
                  <AvatarFallback className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-[120px] truncate text-sm font-medium text-[#F4F4F6]">
                  {user.name ?? user.email}
                </span>
                <ChevronDown className="size-3.5 text-[#52525B] shrink-0" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-52 bg-[#141417] border-[#2E2E34]"
              >
                <DropdownMenuLabel className="text-[#52525B]">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                  <DropdownMenuItem
                    key={href}
                    render={
                      <Link
                        href={href}
                        className="flex items-center gap-2 w-full text-[#A1A1AA] hover:text-[#F4F4F6]"
                      >
                        <Icon className="size-4" />
                        {label}
                      </Link>
                    }
                  />
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Unauthenticated — Login + Register */
            <>
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center justify-center h-8 px-2.5 text-sm font-medium rounded-lg",
                  "text-[#A1A1AA] hover:text-[#F4F4F6] hover:bg-[#1C1C20]",
                  "transition-colors duration-150"
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  "inline-flex items-center justify-center h-8 px-2.5 text-sm font-semibold rounded-lg",
                  "bg-[#F59E0B] text-[#0C0C0F]",
                  "hover:bg-[#D97706] hover:shadow-[0_0_16px_rgba(245,158,11,0.3)]",
                  "transition-all duration-200"
                )}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Hamburger ──────────────────────────────────────── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={cn(
              "md:hidden flex items-center justify-center size-8 rounded-md",
              "text-[#A1A1AA] hover:text-[#F4F4F6] hover:bg-[#1C1C20]",
              "transition-colors duration-150"
            )}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-[#141417] border-[#2E2E34] p-0"
          >
            <SheetHeader className="border-b border-[#2E2E34] px-5 py-4">
              <SheetTitle className="flex items-center gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Aperture
                    className="size-5 text-[#F59E0B]"
                    strokeWidth={1.75}
                  />
                  <span
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-base font-bold text-[#F4F4F6]"
                  >
                    Studio<span className="text-[#F59E0B]">Space</span>
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-3 py-4">
              {/* Nav links */}
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <SheetClose
                    key={href}
                    render={
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "text-[#A1A1AA] hover:bg-[#1C1C20] hover:text-[#F4F4F6]"
                        )}
                      >
                        {label}
                      </Link>
                    }
                  />
                );
              })}

              <div className="my-2 h-px bg-[#2E2E34]" />

              {user ? (
                <>
                  {/* Authenticated user info */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar size="default">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#F4F4F6]">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-[#52525B]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-[#2E2E34]" />

                  {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                    <SheetClose
                      key={href}
                      render={
                        <Link
                          href={href}
                          className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-[#A1A1AA] hover:bg-[#1C1C20] hover:text-[#F4F4F6] transition-colors"
                        >
                          <Icon className="size-4 shrink-0" />
                          {label}
                        </Link>
                      }
                    />
                  ))}

                  <div className="my-1 h-px bg-[#2E2E34]" />
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors w-full text-left"
                  >
                    <LogOut className="size-4 shrink-0" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-3 pt-1">
                  <SheetClose
                    render={
                      <Link
                        href="/login"
                        className={cn(
                          "inline-flex items-center justify-center w-full h-8 px-3 text-sm font-medium rounded-lg",
                          "border border-[#2E2E34] text-[#A1A1AA]",
                          "hover:bg-[#1C1C20] hover:text-[#F4F4F6]",
                          "transition-colors duration-150"
                        )}
                      >
                        Login
                      </Link>
                    }
                  />
                  <SheetClose
                    render={
                      <Link
                        href="/register"
                        className={cn(
                          "inline-flex items-center justify-center w-full h-8 px-3 text-sm font-semibold rounded-lg",
                          "bg-[#F59E0B] text-[#0C0C0F]",
                          "hover:bg-[#D97706]",
                          "transition-colors duration-150"
                        )}
                      >
                        Register
                      </Link>
                    }
                  />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;

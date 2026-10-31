"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
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
    Sparkles,
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
    DropdownMenuGroup,
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
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* ─── Nav Links ─────────────────────────────────────────────────────── */
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/#about" },
] as const;

/* ─── Authenticated Dropdown Items ──────────────────────────────────── */
const USER_MENU_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Add New Studio", href: "/studios/new", icon: PlusSquare },
    { label: "My Studio Listings", href: "/my-studios", icon: Building2 },
    { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
] as const;

/* ─── Component ─────────────────────────────────────────────────────── */
const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
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
        await signOut();
        redirect('login');
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-colors duration-200",
                "border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-xs"
            )}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* ── Logo ─────────────────────────────────────────────────── */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 shrink-0"
                    aria-label="StudioSpace Home"
                >
                    <div
                        className={cn(
                            "relative flex size-9 items-center justify-center rounded-xl",
                            "border border-primary/20 bg-primary/10 text-primary",
                            "transition-all duration-300",
                            "group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                        )}
                    >
                        <Aperture className="size-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.8} />
                        <span className="absolute -top-1 -right-1 flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span
                            style={{ fontFamily: "var(--font-display)" }}
                            className="text-[17px] font-bold tracking-tight text-text-primary"
                        >
                            Studio<span className="text-primary">Space</span>
                        </span>
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-text-muted -mt-1 hidden sm:block">
                            Creator Studios
                        </span>
                    </div>
                </Link>

                {/* ── Desktop Nav Links ─────────────────────────────────────── */}
                <ul className="hidden md:flex items-center gap-1.5 rounded-full border border-border/50 bg-surface-1/60 p-1 backdrop-blur-md">
                    {NAV_LINKS.map(({ label, href }) => {
                        const isActive =
                            href === "/" ? pathname === "/" : pathname.startsWith(href);
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                                        isActive
                                            ? "bg-primary/15 text-primary shadow-xs font-semibold"
                                            : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                                    )}
                                >
                                    {label}
                                    {isActive && (
                                        <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* ── Desktop Action Area ───────────────────────────────────── */}
                <div className="hidden md:flex items-center gap-2.5">
                    {/* Light / Dark Mode Toggle */}
                    <ThemeToggle />

                    <div className="h-4 w-px bg-border/60 mx-1" />

                    {user ? (
                        /* Authenticated — Profile Avatar & Dropdown */
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={cn(
                                    "flex items-center gap-2 rounded-xl p-1.5 pr-2.5",
                                    "border border-border/60 bg-surface-1/70 backdrop-blur-md transition-all duration-200",
                                    "hover:border-primary/40 hover:bg-surface-2",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                )}
                            >
                                <Avatar size="default" className="size-7.5 ring-1 ring-border">
                                    <AvatarImage
                                        src={user.image ?? undefined}
                                        alt={user.name ?? "User"}
                                    />
                                    <AvatarFallback className="bg-primary/15 text-primary text-[11px] font-bold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="max-w-[110px] truncate text-xs font-semibold text-text-primary">
                                    {user.name ?? user.email}
                                </span>
                                <ChevronDown className="size-3.5 text-text-muted shrink-0" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                sideOffset={8}
                                className="w-56 rounded-xl border-border/80 bg-surface-1/95 p-1.5 shadow-xl backdrop-blur-xl"
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="px-2 py-1.5">
                                        <p className="text-xs font-semibold text-text-primary truncate">{user.name ?? "Creator"}</p>
                                        <p className="text-[11px] text-text-muted truncate">{user.email}</p>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="bg-border/60 my-1" />

                                {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                                    <DropdownMenuItem
                                        key={href}
                                        render={
                                            <Link
                                                href={href}
                                                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                                            >
                                                <Icon className="size-3.5 text-text-muted" />
                                                {label}
                                            </Link>
                                        }
                                    />
                                ))}

                                <DropdownMenuSeparator className="bg-border/60 my-1" />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={handleSignOut}
                                    className="cursor-pointer text-xs flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-danger hover:bg-danger/10"
                                >
                                    <LogOut className="size-3.5" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        /* Unauthenticated — Login & Register buttons */
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className={cn(
                                    "inline-flex items-center justify-center h-8.5 px-3.5 text-xs font-medium rounded-lg",
                                    "text-text-secondary hover:text-text-primary hover:bg-surface-2/80",
                                    "transition-all duration-150"
                                )}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className={cn(
                                    "inline-flex items-center justify-center gap-1.5 h-8.5 px-4 text-xs font-semibold rounded-lg",
                                    "bg-primary text-primary-fg shadow-xs",
                                    "hover:bg-primary-hover hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]",
                                    "active:scale-95 transition-all duration-200"
                                )}
                            >
                                <Sparkles className="size-3" />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* ── Mobile View Controls ─────────────────────────────────── */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger
                            className={cn(
                                "flex size-9 items-center justify-center rounded-xl border border-border/60 bg-surface-1/70",
                                "text-text-secondary hover:text-text-primary hover:bg-surface-2",
                                "transition-colors"
                            )}
                            aria-label="Open navigation menu"
                        >
                            <Menu className="size-4.5" />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-80 border-border/80 bg-surface-1/95 backdrop-blur-2xl p-0"
                        >
                            <SheetHeader className="border-b border-border/60 px-5 py-4">
                                <SheetTitle className="flex items-center gap-2.5">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Aperture className="size-4.5" strokeWidth={1.8} />
                                    </div>
                                    <span
                                        style={{ fontFamily: "var(--font-display)" }}
                                        className="text-base font-bold text-text-primary"
                                    >
                                        Studio<span className="text-primary">Space</span>
                                    </span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-1 px-4 py-5">
                                <p className="px-3 text-[10px] uppercase font-semibold tracking-wider text-text-muted mb-1">
                                    Menu
                                </p>
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
                                                        "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                                                        isActive
                                                            ? "bg-primary/15 text-primary font-semibold"
                                                            : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                                                    )}
                                                >
                                                    {label}
                                                </Link>
                                            }
                                        />
                                    );
                                })}

                                <div className="my-3 h-px bg-border/60" />

                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2/40 p-2.5 mb-2">
                                            <Avatar size="default" className="size-8">
                                                <AvatarImage
                                                    src={user.image ?? undefined}
                                                    alt={user.name ?? "User"}
                                                />
                                                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-semibold text-text-primary">
                                                    {user.name}
                                                </p>
                                                <p className="truncate text-[11px] text-text-muted">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="px-3 text-[10px] uppercase font-semibold tracking-wider text-text-muted mb-1">
                                            Creator Account
                                        </p>

                                        {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                                            <SheetClose
                                                key={href}
                                                render={
                                                    <Link
                                                        href={href}
                                                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
                                                    >
                                                        <Icon className="size-4 shrink-0 text-text-muted" />
                                                        {label}
                                                    </Link>
                                                }
                                            />
                                        ))}

                                        <div className="my-2 h-px bg-border/60" />
                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setMobileOpen(false);
                                            }}
                                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-danger hover:bg-danger/10 transition-colors w-full text-left"
                                        >
                                            <LogOut className="size-4 shrink-0" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2 pt-2">
                                        <SheetClose
                                            render={
                                                <Link
                                                    href="/login"
                                                    className={cn(
                                                        "inline-flex items-center justify-center w-full h-9 text-xs font-medium rounded-lg",
                                                        "border border-border text-text-secondary",
                                                        "hover:bg-surface-2 hover:text-text-primary transition-colors"
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
                                                        "inline-flex items-center justify-center w-full h-9 text-xs font-semibold rounded-lg",
                                                        "bg-primary text-primary-fg shadow-xs",
                                                        "hover:bg-primary-hover transition-colors"
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
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

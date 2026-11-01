import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    const callback = request.nextUrl.pathname + request.nextUrl.search;
    redirectUrl.searchParams.set("callbackUrl", callback);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings", "/dashboard", "/studios/new", "/my-studio-listings"],
};

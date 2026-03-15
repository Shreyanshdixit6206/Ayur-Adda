import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [], // configured in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
      const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname.startsWith("/auth") ||
        nextUrl.pathname.startsWith("/courses"); // add more public routes as needed
      
      if (isApiAuthRoute) return true;

      if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

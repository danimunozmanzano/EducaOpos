// src/middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tema/:path*",
    "/programacio/:path*",
    "/exposicio/:path*",
    "/progres/:path*",
    "/reserves/:path*",
  ],
};

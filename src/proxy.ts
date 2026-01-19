import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define the protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // Protects /dashboard AND /dashboard/settings, etc.
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Check if the current route is protected
  if (isProtectedRoute(req)) {
    // 3. If so, force the user to sign in
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

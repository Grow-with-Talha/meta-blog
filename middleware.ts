import { authMiddleware } from "@clerk/nextjs";

// Export the `authMiddleware` with the name `middleware`
export const middleware = authMiddleware({
  publicRoutes: ['/', '/post/(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
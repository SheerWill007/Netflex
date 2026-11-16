/**
 * Sign-in is optional on Netflex: watching never needs an account. Clerk is only wired up
 * when a publishable key is configured, so the site still runs without one.
 */
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());

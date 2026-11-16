'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { clerkEnabled } from '@/lib/auth';
import { CaretIcon } from './Icons';

function Avatar() {
  return (
    <>
      <span className="nav__avatar-face" aria-hidden="true" />
      <CaretIcon className="nav__caret" />
    </>
  );
}

/** Profile button: Clerk account menu when sign-in is configured, a static avatar otherwise. */
export default function ProfileMenu() {
  if (!clerkEnabled) {
    return (
      <span className="nav__avatar" aria-label="Guest profile" role="img">
        <Avatar />
      </span>
    );
  }

  return (
    <>
      <SignedIn>
        <UserButton appearance={{ elements: { avatarBox: 'nav__avatar-box' } }} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="nav__avatar" aria-label="Sign in">
            <Avatar />
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

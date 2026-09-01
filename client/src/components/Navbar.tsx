'use client';

import { useEffect, useState } from 'react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import '@/styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--solid' : ''}`}>
      <div className="navbar__left">
        <h1 className="logo">NETFLIX-CLONE</h1>
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">TV Shows</a>
          <a href="#">Movies</a>
          <a href="#">New &amp; Popular</a>
          <a href="#">My List</a>
        </nav>
      </div>
      <div className="navbar__right">
        <button className="icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24">
            <path
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="nav-text">Kids</span>
        <button className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 2a6 6 0 00-6 6v3.5L4 15h16l-2-3.5V8a6 6 0 00-6-6z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 19a2.5 2.5 0 005 0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
        
        {/* Clerk Authentication */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="auth-btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="auth-btn auth-btn--primary">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;

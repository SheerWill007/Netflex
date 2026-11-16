'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import { BellIcon, GridIcon, SearchIcon } from './Icons';
import '@/styles/Navbar.css';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/series', label: 'TV Series' },
  { href: '/movies', label: 'Movies' },
  { href: '/my-list', label: 'My List' },
];

export interface NavCategory {
  id: string;
  name: string;
}

export interface NavNotification {
  id: string;
  title: string;
  note: string;
}

interface NavbarProps {
  categories: NavCategory[];
  notifications: NavNotification[];
}

type Menu = 'categories' | 'notifications' | null;

export default function Navbar({ categories, notifications }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(pathname === '/search');
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [menu, setMenu] = useState<Menu>(null);
  const [seen, setSeen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    if (!menu) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const toggleMenu = (next: Exclude<Menu, null>) => {
    setMenu((m) => (m === next ? null : next));
    if (next === 'notifications') setSeen(true);
  };

  return (
    <header ref={navRef} className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__left">
        <Link href="/" className="nav__logo" aria-label="Netflex home">
          NETFLEX
        </Link>
        <nav className="nav__pills" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__pill ${pathname === link.href ? 'nav__pill--active' : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="nav__right">
        <form
          className={`nav__search ${searchOpen ? 'nav__search--open' : ''}`}
          onSubmit={submitSearch}
          role="search"
        >
          <button
            type={searchOpen ? 'submit' : 'button'}
            className="nav__icon"
            aria-label="Search"
            onClick={() => !searchOpen && setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => !query && pathname !== '/search' && setSearchOpen(false)}
            placeholder="Titles, genres, decades"
            aria-label="Search titles"
            tabIndex={searchOpen ? 0 : -1}
          />
        </form>

        <div className="nav__menu-wrap">
          <button
            className="nav__icon"
            aria-label="Browse categories"
            aria-expanded={menu === 'categories'}
            onClick={() => toggleMenu('categories')}
          >
            <GridIcon />
          </button>
          {menu === 'categories' && (
            <div className="nav__menu nav__menu--grid" role="menu">
              <p className="nav__menu-title">Browse by category</p>
              {categories.map((c) => (
                <Link key={c.id} href={`/#${c.id}`} role="menuitem" onClick={() => setMenu(null)}>
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="nav__menu-wrap">
          <button
            className="nav__icon"
            aria-label={`Notifications${!seen && notifications.length ? `, ${notifications.length} new` : ''}`}
            aria-expanded={menu === 'notifications'}
            onClick={() => toggleMenu('notifications')}
          >
            <BellIcon />
            {!seen && notifications.length > 0 && (
              <span className="nav__badge">{notifications.length}</span>
            )}
          </button>
          {menu === 'notifications' && (
            <div className="nav__menu nav__menu--notes" role="menu">
              <p className="nav__menu-title">New on Netflex</p>
              {notifications.map((n) => (
                <div key={n.id} className="nav__note">
                  <strong>{n.title}</strong>
                  <span>{n.note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav__profile">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}

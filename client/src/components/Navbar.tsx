import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--solid' : ''}`}>
      <div className="navbar__left">
        <NavLink to="/" className="logo">
          NETFLIX-CLONE
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/tv-shows">TV Shows</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/my-list">My List</NavLink>
        </nav>
      </div>
      <div className="navbar__right">
        <form className={`search ${searchOpen ? 'search--open' : ''}`} onSubmit={onSearch}>
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
          >
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
          {searchOpen && (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Titles, genres"
              aria-label="Search titles"
            />
          )}
        </form>
        <div className="profile" onMouseLeave={() => setMenuOpen(false)}>
          <button
            type="button"
            className="profile__trigger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            <div className="profile__avatar" />
            <svg className="profile__caret" viewBox="0 0 24 24">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="profile__menu">
              <p className="profile__name">{user?.name}</p>
              <p className="profile__email">{user?.email}</p>
              <button type="button" onClick={logout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

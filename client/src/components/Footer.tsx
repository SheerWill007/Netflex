import Link from 'next/link';
import '@/styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <Link href="/">Home</Link>
          <Link href="/series">TV Series</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/my-list">My List</Link>
        </div>
        <div className="footer__col">
          <a href="https://archive.org/details/feature_films" target="_blank" rel="noreferrer">
            Internet Archive feature films
          </a>
          <a href="https://studio.blender.org/films/" target="_blank" rel="noreferrer">
            Blender open movies
          </a>
          <a href="https://creativecommons.org/licenses/" target="_blank" rel="noreferrer">
            About Creative Commons
          </a>
        </div>
      </div>
      <p className="footer__note">
        Netflex streams only public-domain and openly licensed titles hosted by the Internet
        Archive. Creative Commons titles are credited to their creators on each title page.
      </p>
      <p className="footer__copy">© {new Date().getFullYear()} Netflex</p>
    </footer>
  );
}

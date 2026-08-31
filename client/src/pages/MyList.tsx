import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { DetailsModal, PlayerModal } from '../components/Modals';
import { useWatchlist } from '../context/WatchlistContext';

const MyList = () => {
  const { items, loading } = useWatchlist();

  return (
    <div className="app">
      <Navbar />
      <main className="page">
        <h2 className="page__title">My List</h2>
        {loading && <p className="page__status">Loading your list…</p>}
        {!loading && items.length === 0 && (
          <p className="page__status">Your list is empty. Add titles from Home.</p>
        )}
        <div className="grid">
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
      <DetailsModal />
      <PlayerModal />
    </div>
  );
};

export default MyList;

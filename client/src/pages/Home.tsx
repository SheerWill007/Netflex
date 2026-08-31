import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Footer from '../components/Footer';
import { DetailsModal, PlayerModal } from '../components/Modals';
import { fetchHeroContent, fetchCategories } from '../services/api';
import type { HeroContent, Category } from '../types';

const Home = () => {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [heroData, categoriesData] = await Promise.all([
          fetchHeroContent(),
          fetchCategories(),
        ]);
        setHero(heroData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      {hero && <Hero content={hero} />}
      <main className="rows">
        {categories.map((category) => (
          <Row key={category.id} category={category} />
        ))}
      </main>
      <Footer />
      <DetailsModal />
      <PlayerModal />
    </div>
  );
};

export default Home;

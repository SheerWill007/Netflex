import CatalogueView from '@/components/CatalogueView';

export const metadata = { title: 'Movies — Netflex' };

export default function MoviesPage() {
  return (
    <CatalogueView
      type="movie"
      heading="Movies"
      intro="Feature films from the silent era to modern open movies, all free to watch."
    />
  );
}

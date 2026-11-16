import type { MediaType } from '@/types';
import Row from './Row';
import ApiError from './ApiError';
import { fetchCategories } from '@/lib/api';

/** Shared page body for the Movies and TV Series tabs. */
export default async function CatalogueView({ type, heading, intro }: { type: MediaType; heading: string; intro: string }) {
  const categories = await fetchCategories(type).catch(() => null);
  if (!categories) return <ApiError />;

  return (
    <>
      <header className="page-header">
        <h1>{heading}</h1>
        <p>{intro}</p>
      </header>
      <div className="rows">
        {categories.map((category) => (
          <Row key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}

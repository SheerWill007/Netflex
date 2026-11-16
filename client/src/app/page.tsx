import Hero from '@/components/Hero';
import NoticePanel from '@/components/NoticePanel';
import Row from '@/components/Row';
import ApiError from '@/components/ApiError';
import { fetchCategories, fetchFeatured } from '@/lib/api';

export default async function HomePage() {
  const data = await Promise.all([fetchFeatured(), fetchCategories()]).catch(() => null);
  if (!data) return <ApiError />;
  const [featured, categories] = data;

  return (
    <>
      <Hero titles={featured} />
      <NoticePanel />
      <div className="rows">
        {categories.map((category) => (
          <Row key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
